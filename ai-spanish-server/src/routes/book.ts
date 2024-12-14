import { Context } from "hono";
import db from "@/db";
import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  ne,
  not,
  notExists,
  sql,
} from "drizzle-orm";
import {
  learningRecord,
  learningRecordTmp,
  session,
  studyDuration,
  users,
  wordBook,
  wordInBook,
  word,
} from "@/db/schema";
import {
  ContextVariables,
  failRes,
  getCurrentDate,
  LearningParamsSchema,
  listRes,
  PageQueryParamsSchema,
  serverEnvs,
  successRes,
  UserParamsSchema,
} from "@/utils";
import axios from "axios";
import { getCookie, setCookie } from "hono/cookie";
import { lucia } from "@/auth";
import log4js from "log4js";
import { date } from "drizzle-orm/pg-core";

const logger = log4js.getLogger("book");
logger.level = "all";

// POST
export async function changeWordBook(c: Context) {
  const body = await c.req.json();
  const { userId, bookId } = body;

  if (!userId || !bookId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  try {
    // 切换用户单词书
    const res = await db
      .update(users)
      .set({ l_book_id: bookId })
      .where(eq(users.id, userId));

    return getWBLearnData(c);
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getAllWBData(c: Context) {
  const { page, pageSize } = PageQueryParamsSchema.parse(c.req.query());

  try {
    const all = await db.select({ count: count() }).from(wordBook);
    const allBook = await db
      .select()
      .from(wordBook)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return c.json(
      listRes({
        total: all[0].count,
        list: allBook,
        queryParams: {
          page,
          pageSize,
        },
      })
    );
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getSingleWBData(c: Context) {
  const { bookId } = c.req.query();

  try {
    const res = await db.select().from(wordBook).where(eq(wordBook.id, bookId));

    return c.json(
      successRes({
        ...res[0],
      })
    );
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getWBLearnData(c: Context) {
  let body;
  if (c.req.method === "POST") {
    body = await c.req.json();
  } else {
    body = c.req.query();
  }
  const { userId, bookId } = body;

  if (!userId || !bookId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  try {
    // 某书的学习情况（区分未学习、学习中、已掌握）(原方案耗时较长，使用两个同步查询替换)
    const learnedRes = db
      .select({ master: learningRecord.master, count: count() })
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.wordBookId, bookId),
          eq(learningRecord.userId, userId)
        )
      )
      .groupBy(learningRecord.master);

    // 单词书单词总数
    const totalRes = db
      .select({ count: count() })
      .from(wordInBook)
      .where(eq(wordInBook.wordBookId, bookId));

    let resList = await Promise.all([learnedRes, totalRes]);

    let bkLearnData = {
      notLearn: 0,
      learn: 0,
      master: 0,
      total: resList[1][0].count,
    };
    for (let i = 0; i < resList[0].length; i++) {
      bkLearnData.learn += resList[0][i].count;
      if (resList[0][i].master)
        bkLearnData.master += resList[0][i].count ? 1 : 0;
    }
    bkLearnData.notLearn = resList[1][0].count - bkLearnData.learn;

    logger.info("📚 totalRes", resList, bkLearnData);

    return c.json(successRes({ ...bkLearnData }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getAllLearnData(c: Context) {
  const { userId } = c.req.query();
  if (!userId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  try {
    // 从词书与单词的关系表里获取当前学习的所有单词
    const res = await db
      .select({ master: learningRecord.master, count: count() })
      .from(learningRecord)
      .where(eq(learningRecord.userId, userId))
      .groupBy(learningRecord.master);

    logger.info("📚 getAllLearnData", res);

    let allLearnData = { learn: 0, master: 0 };
    for (let i = 0; i < res.length; i++) {
      allLearnData.learn += res[i].count;
      if (res[i].master) allLearnData.master = res[i].count;
    }

    return c.json(successRes({ ...allLearnData }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getTodayLearnData(c: Context) {
  const { userId } = c.req.query();
  if (!userId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  const now = new Date();
  try {
    // 获取时间为当天的学习数据
    const res = await db
      .select()
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.userId, userId),
          eq(learningRecord.createdAt, now)
        )
      );
    let data = {
      l_time: 0,
      learn: res.length,
      review: res.length, //todo
    };

    logger.info("📚 getTodayLearnData", res);

    return c.json(successRes({ ...data }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// todo
// GET
export async function getBasicLearningData(c: Context) {
  const { userId, bookId } = c.req.query();
  if (!userId || !bookId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  try {
    // 从词书与单词的关系表里获取当前学习的书的所有单词
    const learnedNumRes = await db
      .select({ count: count() })
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.userId, userId),
          eq(learningRecord.wordBookId, bookId)
        )
      );

    const totalWordsRes = await db
      .select({ count: count() })
      .from(wordInBook)
      .where(eq(wordInBook.wordBookId, bookId));

    const data = {
      needToLearn: 10,
      needToReview: 2,
    };
    return c.json(successRes({ ...data }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getLearningData(c: Context) {
  const { userId, bookId, groupSize, sample } = LearningParamsSchema.parse(
    c.req.query()
  );
  const getSize = Math.round(groupSize * 1.5);
  const batchTimes = Math.ceil(getSize / 10);
  const sampleSize = sample ? 9 : 0;

  if (!userId || !bookId) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  try {
    // 从学习记录中匹配学过的单词;
    const learningRecordQuery = db
      .select()
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.userId, userId),
          eq(learningRecord.wordId, wordInBook.wordId)
        )
      );

    // 从词书与单词的关系表里获取当前学习的书的所有单词
    const filteredWordsQuery = db
      .select()
      .from(wordInBook)
      .where(
        and(
          eq(wordInBook.wordBookId, bookId),
          //   删去已经学过的单词
          notExists(learningRecordQuery)
        )
      )
      .limit(getSize)
      .offset(0)
      .as("filteredWords");

    // 查找获取取得的单词是否有学习过的“缓存”
    const recordTmpQuery = await db
      .select()
      .from(learningRecordTmp)
      .leftJoin(
        filteredWordsQuery,
        and(
          eq(learningRecordTmp.userId, userId),
          eq(filteredWordsQuery.wordId, learningRecordTmp.wordId)
        )
      )
      .as("recordTmp");

    // 获取取得的单词的详细数据
    const detailQuery = await db
      .select()
      .from(filteredWordsQuery)
      .leftJoin(word, and(eq(word.id, filteredWordsQuery.wordId)));

    // 获取干扰项并合并到结果中
    const result = await Promise.all(
      detailQuery.map(async (row) => ({
        ...row,
        sample_list: await getDistractionWords(
          row.word?.id,
          bookId,
          sampleSize
        ),
      }))
    );
    logger.info("📚 getLearningData", result);

    return c.json(successRes(result));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// 获取干扰项单词列表
async function getDistractionWords(
  mainWordId: any,
  wd_bk_id: any,
  sampleSize: number
) {
  return await db
    .select({
      word_id: wordInBook.wordId,
      word: word.word,
      translation: word.translation,
    })
    .from(wordInBook)
    .leftJoin(word, eq(word.id, wordInBook.wordId))
    .where(
      and(
        eq(wordInBook.wordBookId, wd_bk_id),
        ne(wordInBook.wordId, mainWordId)
      )
    )
    .limit(sampleSize);
}
