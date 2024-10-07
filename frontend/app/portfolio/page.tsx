import ConnectWalletToContinue from '@/components/ui2/ConnectWalletToContinue';
import PortfolioTitle from '@/components/ui2/PortfolioTitle';
import { getSession } from '@/lib/iron-session/config';
import { ChartAssets } from './components/ChartAssets';
import HoldingAssets from './components/HoldingAssets';
import HoldingLPs from './components/HoldingLPs';

export default async function PortfolioPage() {
  const session = await getSession();
  return (
    <ConnectWalletToContinue serverAddress={session.address}>
      <div className="v2-container">
        <PortfolioTitle />
        <div className="flex flex-col md:flex-row items-start gap-6 v2-container">
          <div className="w-2/3 space-y-6">
            {/* <CreatedBets serverMarkets={markets} /> */}
            <HoldingAssets />
            <HoldingLPs />
          </div>
          <ChartAssets className="w-1/3" />
        </div>
      </div>
    </ConnectWalletToContinue>
  );
}
