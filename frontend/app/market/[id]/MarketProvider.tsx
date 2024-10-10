'use client';
import { MarketDetail } from '@/lib/web3/market';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useBetMarketState = (serverMarket: MarketDetail) => useState<MarketDetail>(serverMarket);
const MarketContext = createContext<ReturnType<typeof useBetMarketState> | undefined>(undefined);

export const MarketProvider = ({ serverMarket, children }: PropsWithChildren<{ serverMarket: MarketDetail }>) => {
  const betMarketState = useBetMarketState(serverMarket);
  return <MarketContext.Provider value={betMarketState}>{children}</MarketContext.Provider>;
};

export const useMarket = () => {
  const [marketDetail] = useContext(MarketContext)!;
  return marketDetail;
};
