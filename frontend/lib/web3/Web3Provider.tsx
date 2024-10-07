'use client';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { abstractTestnet } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { wagmiClientConfig } from './wagmiConfig';

const queryClient = new QueryClient();

export default function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiClientConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} showRecentTransactions={true} initialChain={abstractTestnet}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
