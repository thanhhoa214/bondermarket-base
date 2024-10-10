import ConnectWalletToContinue from '@/components/ui2/ConnectWalletToContinue';
import { getSession } from '@/lib/iron-session/config';
import { getMarkets } from '@/lib/web3/market';
import { ChartAssets } from './components/ChartAssets';
import CreatedBets from './components/CreatedBets';
import HoldingAssets from './components/HoldingAssets';
import HoldingLPs from './components/HoldingLPs';

export default async function PortfolioPage() {
  const markets = await getMarkets();
  const session = await getSession();
  return (
    <ConnectWalletToContinue serverAddress={session.address}>
      <div className="v2-container">
        <header className="flex flex-col justify-center items-center sm:items-start w-full mt-4 border-b">
          <div className="flex text-2xl text-center font-light">Manage all your positions here</div>
          <div className="font-light text-center text-base text-muted-foreground">
            Bets | Liquidity positions | Created markets | BonderTokens | Profile{' '}
          </div>
        </header>
        <div className="flex flex-col md:flex-row items-start gap-6 v2-container">
          <div className="w-2/3 space-y-6">
            <CreatedBets serverMarkets={markets} />
            <HoldingAssets />
            <HoldingLPs />
          </div>
          <ChartAssets className="w-1/3" />
        </div>
      </div>
    </ConnectWalletToContinue>
  );
}
