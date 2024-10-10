'use client';
import { MarketDetail } from '@/lib/web3/market';
import { useQuery } from '@tanstack/react-query';
import MarketCard from './MarketCard';

export default function HomeMarketCard({ serverMarkets }: { serverMarkets: MarketDetail[] }) {
  const { data: markets } = useQuery({ queryKey: ['markets'], initialData: serverMarkets });

  return (
    <section>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {markets.map((marketDetail) => (
          <MarketCard key={marketDetail.market.betId.toString()} marketDetail={marketDetail} />
        ))}
      </ul>
    </section>
  );
}
