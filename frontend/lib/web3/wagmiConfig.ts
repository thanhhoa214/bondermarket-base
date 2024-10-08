import { http } from 'viem';
import { createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiClientConfig = createConfig({
  connectors: [
    coinbaseWallet({
      appName: 'bonder.market',
      appLogoUrl: 'https://create.bonder.market/icon.png',
      chainId: baseSepolia.id,
      darkMode: true,
    }),
  ],
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/MntzabqU0UcODnygA4tXlrTDpguE57gb'),
  },
});
