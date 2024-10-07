import { EventWithTimestamp } from '@/hooks/web3/usePastEvents';
import { formatUnits } from 'viem';
import { moneyFormatter } from '../utils';

export const zero = BigInt(0);

export interface TransferData {
  timestamp: number;
  value: number;
  from?: string;
  to?: string;
}

export const erc20EventToTransferData = (event: EventWithTimestamp, decimals = 18): TransferData => {
  const value = event.args.value ?? BigInt(0);
  return {
    timestamp: parseBlockTimestamp(event.timestamp).getTime(),
    value: Number(formatUnits(value, decimals)),
    from: event.args.from,
    to: event.args.to,
  };
};

export function parseBlockTimestamp(timestamp: bigint): Date {
  const timestampNumber = Number(timestamp.toString().replace('n', ''));
  return new Date(timestampNumber * 1000);
}

export function formatBigInt(num: bigint, decimals = 18): string {
  return moneyFormatter(Number(formatUnits(num, decimals)));
}
