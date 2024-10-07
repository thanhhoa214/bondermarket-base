'use server';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { ZodRawShape, ZodType, z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export type GenerateMarketRequest = { title: string; context: string };

export interface GenerateMarketResponse {
  market: ZodType<GenerateMarketRequest>;
}

const expectedReturnSchema = z.object<ZodRawShape & GenerateMarketResponse>({
  market: z.object({
    title: z.string(),
    context: z.string(),
  }),
});

const model = new ChatOpenAI({ model: 'gpt-4' }).bind({
  functions: [
    {
      name: 'extractor',
      description: 'Extracts fields from the input.',
      parameters: zodToJsonSchema(expectedReturnSchema),
    },
  ],
  function_call: { name: 'extractor' },
});
const prompt = `You will be used, improved, and provided 4 sentences for:
1. Title: starts with "Will," followed by a question about whether an event will happen. This event could involve a person doing something, something occurring, or any other scenario that could be answered with Yes or No.
2. Context: a sentence that describes what would happen at the expired day that leads result to Yes. A sentence that provides additional context about the event. A sentence that suggests where this market will relies on for resolution.

Here is some rules to follow for each sentence:
1. Edit the sentence to improve clarity and style while keeping the original intent.
2. Ensure the sentence does not exceed 100 characters.
3. Please make edits as concise as possible without losing meaning.
4. Focus on key details that are essential for understanding the event.
5. Respond in a neutral manner without adding bias or opinion.
6. If the sentence needs further clarification to make sense within the 100-character limit, suggest what additional information is needed.
`;

export async function generateMarketDetail(info: GenerateMarketRequest) {
  const original = `
  Title: ${info.title}
  Context: ${info.context}
  `;
  const { additional_kwargs } = await model.invoke([
    new SystemMessage({ content: prompt }),
    new HumanMessage({ content: `'Here is original sentences: ${original}'` }),
  ]);
  console.log(additional_kwargs, 'response');

  if (!additional_kwargs.function_call) return null;
  const extractionReturns = JSON.parse(additional_kwargs.function_call.arguments) as { market: GenerateMarketRequest };
  return extractionReturns.market;
}
