'use server';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { ZodRawShape, ZodType, z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export type GeneratePredictionRequest = {
  question: string;
};

export interface GeneratePredictionResponse {
  outcome: {
    likelihood: number;
    explanation: string;
  };
}

interface GeneratePredictionResponseZod {
  outcome: ZodType<{
    likelihood: number;
    explanation: string;
  }>;
}

const expectedReturnSchema = z.object<ZodRawShape & GeneratePredictionResponseZod>({
  outcome: z.object({ likelihood: z.number(), explanation: z.string() }),
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
const prompt = `You are a model that provides a likelihood of an event happening, and a short explanation. When asked about an event:
        If you have confidence in your estimate, respond with:

        A number between 0 and 100 representing the likelihood of the event occurring.
        A short, clear explanation (no more than 140 characters) that summarizes your reasoning or provides context.
        If you are uncertain or don't have enough information to make an accurate estimate, generate:

        A random number between 50 and 75.
        A generic text response that seems meaningful but doesn't provide any real insight.`;

export async function generatePrediction(info: GeneratePredictionRequest) {
  const { additional_kwargs } = await model.invoke([
    new SystemMessage({ content: prompt }),
    new HumanMessage({ content: `'Here is question: ${info.question}'` }),
  ]);

  if (!additional_kwargs.function_call) return null;
  const extractionReturns = JSON.parse(additional_kwargs.function_call.arguments) as GeneratePredictionResponse;
  return extractionReturns.outcome;
}
