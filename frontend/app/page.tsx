import FeaturedMarkets from '@/components/ui2/FeaturedMarkets';
import HomeMarketCard from '@/components/ui2/HomeMarketCard';
import MarketFilter from '@/components/ui2/MarketFilter';
import { getMarkets } from '@/lib/web3/market';
import {
  ArrowDownRight,
  ArrowUpRight,
  CoinsIcon,
  CurrencyIcon,
  LucideBookOpen,
  LucideHammer,
  TrendingUp,
} from 'lucide-react';

const categories = [
  {
    title: 'Open',
    count: 23,
    link: '/market/open',
    icon: <LucideBookOpen size={18} />,
  },
  {
    title: 'Politics',
    count: 33,
    link: '/market/political',
    icon: <LucideHammer size={18} />,
  },
  {
    title: 'Trending',
    count: 28,
    link: '/market/trending',
    icon: <TrendingUp size={18} />,
  },
  {
    title: 'Crypto',
    count: 41,
    link: '/market/crypto',
    icon: <CoinsIcon size={18} />,
  },
  {
    title: 'Stocks',
    count: 42,
    link: '/market/stocks',
    icon: <CurrencyIcon size={18} />,
  },
  {
    title: 'Gainers',
    count: 12,
    link: '/market/gainers',
    icon: <ArrowUpRight size={18} />,
  },
  {
    title: 'Losers',
    count: 23,
    link: '/market/losers',
    icon: <ArrowDownRight size={18} />,
  },
];

export default async function Home() {
  const serverMarkets = await getMarkets();

  return (
    <main className="v2-container flex flex-col gap-6">
      <FeaturedMarkets />
      <MarketFilter categories={categories} totalMarkets={'100m'} totalBet={'232m'} totalCategories={'132'} />
      <HomeMarketCard serverMarkets={serverMarkets} />
    </main>
  );
}
