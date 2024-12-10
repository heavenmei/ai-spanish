import { Context } from "hono";
import db from "@/db";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { session, studyDuration, users } from "@/db/schema";
import {
  ContextVariables,
  failRes,
  listRes,
  serverEnvs,
  successRes,
  UserParamsSchema,
} from "@/utils";
import axios from "axios";
import { getCookie, setCookie } from "hono/cookie";
import { lucia } from "@/auth";
import log4js from "log4js";

const logger = log4js.getLogger("user");
logger.level = "all";

// GET
export async function info(c: Context<{ Variables: ContextVariables }>) {
  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "用户登录失效" }));
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  return c.json(successRes({ message: "用户验证成功", ...existingUser }));
}

// POST
export async function login(c: Context<{ Variables: ContextVariables }>) {
  const body = await c.req.json();
  const { code, nickName, avatarUrl } = UserParamsSchema.parse(body);

  const { data } = await axios.get(
    "https://api.weixin.qq.com/sns/jscode2session",
    {
      params: {
        appid: serverEnvs.WX_APPID,
        secret: serverEnvs.WX_SECRET,
        js_code: code,
        grant_type: "authorization_code",
      },
    }
  );
  logger.info("user", data);

  let curUser = null;
  try {
    curUser = await db.query.users.findFirst({
      where: eq(users.id, data.openid),
    });

    if (!curUser) {
      curUser = {
        id: data.openid,
        nickName,
        avatarUrl,
      };
      await db.insert(users).values(curUser);
    }
  } catch (e: any) {
    return c.json(
      failRes({
        message: e.detail,
      })
    );
  }

  const session = await lucia.createSession(data.openid, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  setCookie(c, lucia.sessionCookieName, sessionCookie.value);

  return c.json(
    successRes({
      id: curUser.id,
    })
  );
}

// GET
export async function logout(c: Context<{ Variables: ContextVariables }>) {
  const session = c.get("session");
  if (!session) {
    return c.body(null, 401);
  }
  await lucia.invalidateSession(session.id);
  c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
  return c.json(successRes({}));
}

// POST
export async function updateStudyDuration(c: Context) {
  const body = await c.req.json();
  const { userId, duration, id } = body;

  if (!userId || !duration) {
    return c.json(failRes({ message: "缺少必要的参数" }));
  }

  // console.log("学习时长记录===", id, duration);

  try {
    if (id) {
      await db
        .update(studyDuration)
        .set({ duration: Math.floor(duration / 60) })
        .where(eq(studyDuration.id, id));

      return c.json(successRes({ id: id, message: "学习时长记录更新成功" }));
    } else {
      const studyId = await db
        .insert(studyDuration)
        .values({
          userId,
          duration: Math.floor(duration / 60),
          createdAt: new Date(),
        })
        .returning({ id: studyDuration.id });

      return c.json(
        successRes({ id: studyId?.[0]?.id, message: "学习时长记录创建成功" })
      );
    }
  } catch (e: any) {
    return c.json(failRes({ message: e.message }));
  }
}

// GET
export async function getStudyDuration(c: Context) {
  const user = c.get("user");
  if (!user) {
    return c.json(failRes({ code: 401, message: "用户验证失败" }));
  }

  try {
    const durations = await db
      .select()
      .from(studyDuration)
      .where(eq(studyDuration.userId, user.id))
      .orderBy(asc(studyDuration.createdAt));

    const groupedDurations = durations.reduce((acc: any, cur: any) => {
      const date = cur.createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { date, duration: 0 };
      }
      acc[date].duration += cur.duration;
      return acc;
    }, {});

    const result = Object.values(groupedDurations);
    const x = result.map((item: any) => item.date);
    const y = result.map((item: any) => item.duration);
    console.log("getStudyDuration===", result);

    return c.json(successRes({ x, y }));
  } catch (e: any) {
    return c.json(failRes({ message: e.message }));
  }
}
