import { Address } from 'viem';
import { usePairRead } from './usePairRead';

export function usePairReserves(address?: Address | string) {
  const { data: reserves, ...rest } = usePairRead(address)({ functionName: 'getReserves' });
  const [reserve, reserveUsdc] = reserves ?? [0, 1];
  const ratio = Number(reserve) / Number(reserveUsdc) || 1;
  return { ...rest, ratio, reserves };
}
