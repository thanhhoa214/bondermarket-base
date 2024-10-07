'use client';
import { Market } from '@/lib/web3/market';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useBetMarketState = (serverMarket: Market) => useState<Market>(serverMarket);
const MarketContext = createContext<ReturnType<typeof useBetMarketState> | undefined>(undefined);

export const MarketProvider = ({ serverMarket, children }: PropsWithChildren<{ serverMarket: Market }>) => {
  const betMarketState = useBetMarketState(serverMarket);
  return <MarketContext.Provider value={betMarketState}>{children}</MarketContext.Provider>;
};

export const useMarket = () => {
  const [market] = useContext(MarketContext)!;
  return { market };
};
