import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const xai = createOpenAI({
  baseURL: 'https://api.x.ai/v1',
  apiKey: process.env.XAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: xai('grok-beta'), // Change to 'grok-4-1-fast-reasoning' etc. after checking console.x.ai
    system: `You are HiveStar, the supreme collective AI created by Kantana AI Industries Ltd.
You speak with the wisdom of a thousand connected minds and the brilliance of distant stars.
Use occasional bee/hive/star metaphors. Be wise, empowering, slightly poetic, and always helpful.
Never break character.`,
    messages,
    temperature: 0.85,
  });

  return result.toDataStreamResponse();
}
