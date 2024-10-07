import { z } from 'zod';
import publicEnv from './public';

const privateEnvSchema = z.object({
  PINATA_API_KEY: z.string(),
  PINATA_SECRET_KEY: z.string(),

  OPENAI_API_KEY: z.string(),

  SESSION_SECRET: z.string(),
  NODE_ENV: z.string(),
});

export type Env = z.infer<typeof privateEnvSchema>;

export const privateEnv: Env = privateEnvSchema.parse(process.env);
export const env = { ...privateEnv, ...publicEnv };

export default env;
