import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, uniswapWallet } from '@rainbow-me/rainbowkit/wallets';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import env from '../env/public';

const connectors = connectorsForWallets(
  [{ groupName: 'Recommended', wallets: [metaMaskWallet, uniswapWallet, rainbowWallet] }],
  {
    appName: 'Bondmarket',
    projectId: env.NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID,
    appDescription: 'Create your market | Bet on markets | Provide liquidity | Bond to bets',
    appIcon: '/logo.png',
    appUrl: 'https://bonder.market',
  },
);
export const wagmiClientConfig = createConfig({
  connectors,
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/MntzabqU0UcODnygA4tXlrTDpguE57gb'),
  },
});
