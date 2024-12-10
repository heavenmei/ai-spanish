import { and, count, desc, eq } from 'drizzle-orm';
import { Context } from 'hono';

import {
  failRes,
  HistoryParamsSchema,
  listRes,
  PageQueryParamsSchema,
  successRes,
} from '@/utils';
import db from '@/db';
import { models } from '@/db/schema';

// GET
export async function getScenarios(c: Context) {
  const queryParams = PageQueryParamsSchema.parse(c.req.query());
  const { page, pageSize } = queryParams;

  //   const user = c.get('user');
  //   if (!user) {
  //     return c.json(
  //       successRes({
  //         message: '登录以查看翻译历史记录',
  //       })
  //     );
  //   }

  try {
    const totalCount = await db
      .select({ count: count(models.id) })
      .from(models);

    const scenarioList = await db.query.models.findMany({
      //   where: eq(history.uid, user.id),
      orderBy: [desc(models.createdAt)],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return c.json(
      listRes({
        queryParams,
        list: scenarioList,
        total: totalCount[0]?.count ?? 0,
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
