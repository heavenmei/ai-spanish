import { and, asc, count, desc, eq } from 'drizzle-orm';
import { Context } from 'hono';

import {
  failRes,
  listRes,
  MessageListParamSchema,
  MessageParamSchema,
  successRes,
} from '@/utils';
import db from '@/db';
import { messages } from '@/db/schema';

// GET
export async function getMessageList(c: Context) {
  const { historyId, page, pageSize } = MessageListParamSchema.parse(
    c.req.query()
  );

  // const user = c.get('user');
  // if (!user) {
  //   return c.json(
  //     successRes({
  //       message: '登录以查看翻译历史记录',
  //     })
  //   );
  // }

  try {
    const totalCount = await db
      .select({ count: count(messages.id) })
      .from(messages)
      .where(eq(messages.historyId, historyId));

    const historyList = await db.query.messages.findMany({
      where: eq(messages.historyId, historyId),
      orderBy: [asc(messages.createdAt)],
      // offset: (page - 1) * pageSize,
      // limit: pageSize,
    });

    return c.json(
      listRes({
        list: historyList,
        total: totalCount[0]?.count ?? 0,
        queryParams: {
          page,
          pageSize,
        },
      })
    );
  } catch (e: any) {
    console.log(e);

    return c.json(
      failRes({
        message: e.detail,
      })
    );
  }
}

export async function insertMessage(c: Context, params: any) {
  const payload = MessageParamSchema.parse(params);

  // const user = c.get('user');
  // if (!user) {
  //   return;
  // }
  let newMes = {
    // uid: user.id,
    ...payload,
  };
  // console.log('💬 ~ insertMessage===', newMes);

  try {
    const messageId = await db
      .insert(messages)
      .values(newMes)
      .returning({ id: messages.id });

    console.log('💬 ~  Add Message Record  ', messageId?.[0]?.id, newMes);
    return messageId?.[0]?.id;
  } catch (e: any) {
    console.log(e);
    return;
  }
}

export async function updateMessage(c: Context, id: string, params: any) {
  // const payload = MessageParamSchema.parse(params);

  let updateData = {
    // uid: user.id,
    ...params,
  };
  // console.log('💬 ~ updateData===', updateData);

  try {
    await db.update(messages).set(updateData).where(eq(messages.id, id));
    console.log('💬 ~ Update Message Record  ', id, updateData);
    return;
  } catch (e: any) {
    console.log(e);
    return;
  }
}

//POST
export async function updateMessage2(c: Context) {
  const { messageId, content } = MessageParamSchema.parse(c.req.query());
  const siteConfig = c.get('site_config');
  const _targetText = siteConfig?.content ?? content;
  const _id = siteConfig?.id ?? messageId;

  try {
    const updateData: Partial<typeof messages.$inferInsert> = {};
    if (_targetText !== undefined) updateData.content = _targetText;

    if (Object.keys(updateData).length > 0) {
      await db.update(messages).set(updateData).where(eq(messages.id, _id));
    }
    console.log('🚨 ~  Update History Record ', _id);

    return;
  } catch (e: any) {
    console.log(e);

    return c.json(
      failRes({
        message: e.detail,
      })
    );
  }
}

//POST
export async function deleteMessage(c: Context) {
  const { messageId } = MessageParamSchema.parse(c.req.query());
  const user = c.get('user');

  if (!user) {
    return c.json(
      failRes({
        message: '请先登录',
      })
    );
  }

  try {
    await db.delete(messages).where(eq(messages.id, messageId));
    console.log('🚨 ~  Delete History Record ', messageId);

    return c.json(successRes({ message: '历史记录已删除' }));
  } catch (e: any) {
    console.log(e);

    return c.json(
      failRes({
        message: e.detail || '删除历史记录失败',
      })
    );
  }
}
