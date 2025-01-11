import { MessageParamSchema } from "@/utils";
import { Context } from "hono";
import { streamSSE } from "hono/streaming";
import { insertMessage } from "./message";
import chatReplyProcess, { ChatMessage } from "@/lib/chatgpt";

// POST
export async function chat(c: Context) {
  const body = await c.req.json();
  const { type } = MessageParamSchema.parse(body);

  if (type === "audio") {
    return chatAudio(c);
  } else {
    return chatText(c);
  }
}

// POST
export async function chatText(c: Context) {
  const body = await c.req.json();
  const { content, historyId } = MessageParamSchema.parse(body);

  //* Add Record
  const messageId = await insertMessage(c, {
    content,
    historyId,
    isAiRes: false,
  });
  console.log("🚀 ~ add message ~ :", messageId);
  return sse(c, content, historyId);
}

// POST
export async function chatAudio(c: Context) {
  const body = await c.req.json();
  const { content, historyId } = MessageParamSchema.parse(body);

  return sse(c, content, historyId);
}

export async function sse(c: Context, content: string, historyId: string) {
  console.log("🚀 ~ start SSE ~ content ~ :", content, historyId);

  return streamSSE(c, async (stream) => {
    const controller = new AbortController();
    const signal = controller.signal;

    stream.onAbort(async () => {
      console.log("🚨 ~ Client ABORT the connection !!! ~ ");
      controller.abort();
      await stream.writeSSE({
        event: "error",
        data: "Client ABORT the connection !!!",
      });
    });

    let firstChunk = true;
    let fullResponse = "";
    let usage = {};
    await chatReplyProcess({
      message: content,
      signal: signal,
      payload: {
        chatId: historyId,
        responseChatItemId: undefined,
        // messages: [{ role: "user", content: content }],
        detail: true,
        stream: true,
        variables: {
          country: "",
          max_tokens: "500",
          cTime: new Date().toLocaleString("zh-CN", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
      },
      process: (chat: ChatMessage) => {
        console.log("🚀 ~ chatReplyProcess ", chat.text);
        fullResponse = chat.text;
        usage = chat.detail.usage;
        firstChunk = false;

        stream.writeSSE({
          data: JSON.stringify({
            event: "message",
            data: fullResponse,
          }),
        });
      },
    });

    //* Add Record
    const messageId = await insertMessage(c, {
      content: fullResponse.trimStart(),
      historyId,
      isAiRes: true,
    });
    console.log("🚀 ~ add message ~ :", messageId);
    await stream.writeSSE({
      data: JSON.stringify({
        event: "done",
        data: messageId,
      }),
    });
  });
}
