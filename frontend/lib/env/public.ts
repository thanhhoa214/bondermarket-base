import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID: z.string(),
});

export type Env = z.infer<typeof publicEnvSchema>;

// NextJS will replace process.env.NEXT_PUBLIC_* with the actual values at build time. If just put process.env, nothing will be replaced.
export const publicEnv: Env = publicEnvSchema.parse({
  NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID,
});

export default publicEnv;
