import { Context } from "hono";
import db from "@/db";
import { and, asc, count, desc, eq, lte, ne, notExists } from "drizzle-orm";
import {
  learningRecord,
  learningRecordTmp,
  users,
  wordBook,
  wordInBook,
  word,
} from "@/db/schema";
import {
  failRes,
  LearningParamsSchema,
  listRes,
  PageQueryParamsSchema,
  successRes,
} from "@/utils";
import log4js from "log4js";
import sm_5_js from "@/lib/sm-5.js";

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
      .where(ne(wordBook.id, "-1"))
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
      .where(eq(learningRecord.user_id, userId))
      .leftJoin(
        wordInBook,
        and(
          eq(learningRecord.word_id, wordInBook.word_id),
          eq(wordInBook.wb_id, bookId)
        )
      )
      .groupBy(learningRecord.master);

    // 单词书单词总数
    const totalRes = db
      .select({ count: count() })
      .from(wordInBook)
      .where(eq(wordInBook.wb_id, bookId));

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
    logger.info("📚 totalRes", resList);

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
      .where(eq(learningRecord.user_id, userId))
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
          eq(learningRecord.user_id, userId),
          eq(learningRecord.createdAt, now)
        )
      );
    let data = {
      l_time: 0,
      learn: res.length,
      review: res.length, //todo
    };

    logger.info("📚 getTodayLearnData: count", res.length);

    return c.json(successRes({ ...data }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getBasicLearningData(c: Context) {
  const { bookId } = c.req.query();

  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "登录以完成单词记录" }));
  }

  try {
    let tasks = [];
    // 从词书与单词的关系表里获取当前学习的书的所有单词
    const learnedNumRes = await db
      .select({ count: count() })
      .from(learningRecord)
      .where(eq(learningRecord.user_id, user.id))
      .leftJoin(
        wordInBook,
        and(
          eq(learningRecord.word_id, wordInBook.word_id),
          eq(wordInBook.wb_id, bookId)
        )
      );

    const needToReviewRes = db
      .select({ count: count() })
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.user_id, user.id),
          eq(learningRecord.master, false),
          lte(learningRecord.next_l, new Date())
        )
      );

    const totalWordsRes = db
      .select({ count: count() })
      .from(wordInBook)
      .where(eq(wordInBook.wb_id, bookId));

    const resList = await Promise.all([
      learnedNumRes,
      needToReviewRes,
      totalWordsRes,
    ]);

    console.log("📚 getBasicLearningData", resList);

    const data = {
      needToLearn: resList[2][0].count - resList[0][0].count,
      needToReview: resList[1][0].count,
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
          eq(learningRecord.user_id, userId),
          eq(learningRecord.word_id, wordInBook.word_id)
        )
      );

    // 从词书与单词的关系表里获取当前学习的书的所有单词
    const filteredWordsQuery = db
      .select()
      .from(wordInBook)
      .where(
        and(
          eq(wordInBook.wb_id, bookId),
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
          eq(learningRecordTmp.user_id, userId),
          eq(filteredWordsQuery.word_id, learningRecordTmp.word_id)
        )
      )
      .as("recordTmp");

    // 获取取得的单词的详细数据
    const detailQuery = await db
      .select()
      .from(filteredWordsQuery)
      .leftJoin(word, and(eq(word.id, filteredWordsQuery.word_id)));

    // 获取干扰项并合并到结果中
    const result = await Promise.all(
      detailQuery.map(async (row) => ({
        ...row.filteredWords,
        ...row.word,
        sample_list: await getDistractionWords(
          row.word?.id,
          bookId,
          sampleSize
        ),
      }))
    );
    // logger.info("📚 getLearningData", result);

    return c.json(listRes({ list: result }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getReviewData(c: Context) {
  const { userId, bookId, groupSize, sample } = LearningParamsSchema.parse(
    c.req.query()
  );
  const getSize = Math.round(groupSize * 1.5);
  const sampleSize = sample ? 9 : 0;
  const timeStamp = new Date();

  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "请先登录" }));
  }

  try {
    // 选取复习时间不晚于今天的所有记录
    const filteredWordsQuery = db
      .select()
      .from(learningRecord)
      .where(
        and(
          eq(learningRecord.user_id, userId),
          eq(learningRecord.master, false),
          lte(learningRecord.next_l, timeStamp)
        )
      )
      .limit(getSize)
      .as("filteredWords");

    // 获取单词的详细数据
    const detailQuery = await db
      .select()
      .from(filteredWordsQuery)
      .leftJoin(word, and(eq(word.id, filteredWordsQuery.word_id)));

    // 获取干扰项并合并到结果中
    const result = await Promise.all(
      detailQuery.map(async (row) => ({
        ...row.word,
        record: row.filteredWords,
        sample_list: await getDistractionWords(
          row.word?.id,
          bookId,
          sampleSize
        ),
      }))
    );
    logger.info("📚 getReviewData", result);

    return c.json(listRes({ list: result }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// * 获取干扰项单词列表
async function getDistractionWords(
  mainword_id: any,
  wd_bk_id: any,
  sampleSize: number
) {
  const result = await db
    .select()
    .from(wordInBook)
    .leftJoin(word, eq(word.id, wordInBook.word_id))
    .where(
      and(eq(wordInBook.wb_id, wd_bk_id), ne(wordInBook.word_id, mainword_id))
    )
    .limit(sampleSize);

  return result.map((row) => row.word);
}

// POST
export async function addLearningRecord(c: Context) {
  const { learnedList, learningList } = await c.req.json();

  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "登录以完成单词记录" }));
  }

  let last_l = new Date();
  let next_l = new Date(last_l.getTime() + 86400000);

  const defaultLearningRecord = {
    last_l: last_l,
    next_l: next_l,
    NOI: 1,
    EF: "2.5",
    next_n: 0,
    master: false,
    c_time: last_l,
  };
  // 检查属性，means允许自定义
  for (let i = 0; i < learnedList.length; i++) {
    learnedList[i] = {
      ...defaultLearningRecord,
      ...learnedList[i],
      user_id: user.id,
    };
  }

  for (let i = 0; i < learningList.length; i++) {
    learningList[i] = {
      ...learnedList[i],
      user_id: user.id,
    };
  }

  try {
    let learningRes, learnedRes;
    // 将完成学习的单词加入学习记录数据库(learning_record)
    if (learnedList.length > 0) {
      learnedRes = await db
        .insert(learningRecord)
        .values(learnedList)
        .returning({ id: learningRecord.id });
    }

    if (learningList.length > 0) {
      learningRes = await db
        .insert(learningRecordTmp)
        .values(learningList)
        .returning({ id: learningRecordTmp.id });
    }

    logger.info(" 📚 addLearningRecord", learnedRes);

    return c.json(successRes({ learnedRes, learningRes }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}

// POST
export async function updateLearningRecord(c: Context) {
  const { wordLearningRecord } = await c.req.json();

  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "登录以完成单词记录" }));
  }

  try {
    // 先获取用户的OF矩阵
    const userRes = await db.select().from(users).where(eq(users.id, user.id));
    let of_matrix = JSON.parse(userRes[0].of_matrix);

    let tasks = [];
    const res = [];
    for (let j = 0; j < wordLearningRecord.length; j++) {
      let result = sm_5_js(of_matrix, wordLearningRecord[j]);

      let record = result.wd_learning_record;
      res[j] = {
        word: wordLearningRecord[j].word,
        word_id: wordLearningRecord[j].word_id,
        NOI: record.NOI,
        master: record.master,
      };
      of_matrix = result.OF;

      console.log("📚 sm_5_js", result);
      const promise = db
        .update(learningRecord)
        .set({
          ...record,
          user_id: user.id,
        })
        .where(
          and(
            eq(learningRecord.user_id, user.id),
            eq(learningRecord.word_id, wordLearningRecord[j].word_id)
          )
        )
        .returning({ id: learningRecord.id });

      tasks.push(promise);
    }
    let resInner = await Promise.all(tasks);

    // 更新of_矩阵
    await db
      .update(users)
      .set({ of_matrix: JSON.stringify(of_matrix) })
      .where(eq(users.id, user.id));

    logger.info(" 📚 addLearningRecord", resInner);

    return c.json(listRes({ list: res }));
  } catch (e: any) {
    logger.error(e);
    return c.json(failRes({ message: e.message }));
  }
}
