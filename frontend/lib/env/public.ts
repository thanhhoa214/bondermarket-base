import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_ONCHAINKIT_API_KEY: z.string(),
  NEXT_PUBLIC_HTTP_RPC_URL: z.string(),
});

export type Env = z.infer<typeof publicEnvSchema>;

// NextJS will replace process.env.NEXT_PUBLIC_* with the actual values at build time. If just put process.env, nothing will be replaced.
export const publicEnv: Env = publicEnvSchema.parse({
  NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
  NEXT_PUBLIC_HTTP_RPC_URL: process.env.NEXT_PUBLIC_HTTP_RPC_URL,
});

export default publicEnv;
