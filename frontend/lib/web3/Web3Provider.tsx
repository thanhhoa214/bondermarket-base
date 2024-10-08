'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import env from '../env/public';
import { wagmiClientConfig } from './wagmiConfig';

const queryClient = new QueryClient();

export default function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiClientConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={baseSepolia as any}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
