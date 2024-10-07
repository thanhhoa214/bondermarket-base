import { today } from '@/lib/utils';
import * as z from 'zod';

/* credited: https://github.com/colinhacks/zod/issues/387#issuecomment-1191390673 */
export const ONE_MB = 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const createMarketSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  context: z.string().min(2, { message: 'Context must be at least 2 characters.' }),
  bondingTime: z.date().min(today, { message: 'Bonding time must be in the future.' }),
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= ONE_MB, `Max file size is 1MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp files are accepted.',
    ),
  // isPrivateBet: z.boolean(),
  // feeToCreator: z.number().min(0, { message: 'Fee must be at least 0.' }),
  // feeToBondPool: z.number().min(0, { message: 'Fee must be at least 0.' }),
  // feeToTreasury: z.number().min(0, { message: 'Fee must be at least 0.' }),
});

export type CreateMarketSchema = z.infer<typeof createMarketSchema>;

export type IpfsMarketData = Pick<CreateMarketSchema, 'title' | 'image' | 'context'>;
