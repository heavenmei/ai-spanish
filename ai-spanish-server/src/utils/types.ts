import { z } from "zod";
import fs from "fs";
import { Session, User } from "lucia";

export type ContextVariables = {
  user: User | null;
  session: Session | null;
  site_config: Record<string, any>;
};

export function successRes(data: any) {
  const { message, ...rest } = data;
  return {
    success: true,
    message,
    data: rest,
  };
}

export function listRes(data: any) {
  const { message, queryParams, total, list = [] } = data;
  let pagination = {};
  if (queryParams) {
    const { pageSize } = queryParams;
    const totalPages = Math.ceil(total / pageSize);
    pagination = {
      ...queryParams,
      total,
      totalPages,
    };
  }

  return {
    success: true,
    message,
    list,
    pagination,
  };
}

export function failRes(data: any) {
  const { code = 500, message, ...rest } = data;
  return {
    code: code,
    success: false,
    message,
    data: rest,
  };
}

export async function streamToFile(
  stream: NodeJS.ReadableStream,
  path: fs.PathLike
) {
  return new Promise((resolve, reject) => {
    const writeStream = fs
      .createWriteStream(path)
      .on("error", reject)
      .on("finish", resolve);

    stream.pipe(writeStream).on("error", (error) => {
      writeStream.close();
      reject(error);
    });
  });
}

export const PageQueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

export const UserParamsSchema = z.object({
  code: z.coerce.string().default(""),
  avatarUrl: z.coerce.string().default(""),
  nickName: z.coerce.string().default(""),
});

export const MessageListParamSchema = z.object({
  historyId: z.coerce.string().default(""),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

export const MessageParamSchema = z.object({
  type: z.coerce.string().default("text"),
  messageId: z.coerce.string().default(""),
  content: z.coerce.string().default(""),
  isAiRes: z.coerce.boolean().default(false),
  historyId: z.coerce.string().default(""),
  filename: z.coerce.string().default(""),
  seconds: z.coerce.string().default(""),
});

export const HistoryParamsSchema = z.object({
  id: z.coerce.string().default(""),
});

export const OSSParamsSchema = z.object({
  filename: z.coerce.string().default(""),
});
