import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMarketById } from '@/lib/web3/market';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MarketHeader from './components/MarketHeader';
import MarketTradeSection from './components/MarketTradeSection';
import { MarketProvider } from './MarketProvider';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) return {};
  const market = await getMarketById(id);
  if (!market) return {};

  return {
    title: market.metadata.title,
    description: market.metadata.context,
    image: market.metadata.image,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) redirect('/');
  const market = await getMarketById(id);

  return (
    <main className="v2-container">
      <MarketProvider serverMarket={market}>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <section className="w-full md:w-2/3 space-y-4">
            <MarketHeader />
            <Tabs defaultValue="activity">
              <TabsList className="flex w-fit mx-auto">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="top-holder">Top holders</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="activity">TO ADD ACTIVITY HERE</TabsContent>
              <TabsContent value="top-holder">TO ADD TOP HOLDERS</TabsContent>
              <TabsContent value="details">TO ADD DETAILS</TabsContent>
            </Tabs>
          </section>
          <section className="w-full md:w-1/3">
            <MarketTradeSection className="mb-4" />
            <div className="w-full text-center">
              <Link href={'/pool'}>
                <Button variant={'link'} className="gap-2">
                  Become a bonder to earn 20% APY <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </MarketProvider>
    </main>
  );
}
