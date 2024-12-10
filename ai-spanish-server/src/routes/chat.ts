import { serverEnvs, MessageParamSchema } from '@/utils';
import { Context } from 'hono';
import { streamSSE } from 'hono/streaming';
import { insertMessage } from './message';

// POST
export async function chat(c: Context) {
  const body = await c.req.json();
  const { type } = MessageParamSchema.parse(body);

  if (type === 'audio') {
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
  console.log('🚀 ~ add message ~ :', messageId);
  return sse(c, content, historyId);
}

// POST
export async function chatAudio(c: Context) {
  const body = await c.req.json();
  const { content, historyId } = MessageParamSchema.parse(body);

  return sse(c, content, historyId);
}

export async function sse(c: Context, content: string, historyId: string) {
  console.log('🚀 ~ start SSE ~ content ~ :', content, historyId);

  let fullResponse = '';
  return streamSSE(c, async (stream) => {
    const { serverAddress = serverEnvs.BASE_URL, apiKey = serverEnvs.API_KEY } =
      {};
    const controller = new AbortController();
    const signal = controller.signal;

    stream.onAbort(async () => {
      console.log('🚨 ~ Client ABORT the connection !!! ~ ');
      controller.abort();
      await stream.writeSSE({
        event: 'error',
        data: 'Client ABORT the connection !!!',
      });
    });

    const response = await fetch(serverAddress + '/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: content }],
        detail: true,
        stream: true,
        variables: {
          country: '',
          max_tokens: '500',
          cTime: new Date().toLocaleString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        },
      }),
      signal: signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    for await (const chunk of response.body as any) {
      const parsedLines = new TextDecoder()
        .decode(chunk)
        .split('\n')
        .filter((line) => line.trim() !== '');

      for (const line of parsedLines) {
        let event = 'unknown';
        console.log('🚀 ~ chat ~ line ~ ', line);

        if (line.startsWith('data: ')) {
          const dataContent = line.split('data: ')[1];
          if (!dataContent) continue;
          if (dataContent === '[DONE]') {
            await stream.writeSSE({
              data: JSON.stringify({
                event: 'text-done',
              }),
            });
            continue;
          }

          // * Pre-process the dataContent
          try {
            const parsed = JSON.parse(dataContent);
            const text = parsed.choices?.[0]?.delta?.content || '';
            if (!text) continue;

            fullResponse = fullResponse + text;
            await stream.writeSSE({
              data: JSON.stringify({
                event: 'message',
                data: text,
              }),
            });
          } catch (error) {
            console.error('🚨 ~ 解析JSON时出错:');
          }
        }
      }
    }

    console.log('🚨 ~ fullResponse ~ :', fullResponse);

    //* Add Record
    const messageId = await insertMessage(c, {
      content: fullResponse.trimStart(),
      historyId,
      isAiRes: true,
    });
    console.log('🚀 ~ add message ~ :', messageId);
    await stream.writeSSE({
      data: JSON.stringify({
        event: 'done',
        data: messageId,
      }),
    });
  });
}
