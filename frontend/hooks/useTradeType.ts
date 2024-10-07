import { useState } from 'react';

export type TradeType = 'bet' | 'bond';
export function useTradeType(tradeType?: TradeType) {
  return useState<TradeType | undefined>(tradeType);
}
