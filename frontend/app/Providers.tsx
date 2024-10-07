import { TooltipProvider } from '@/components/ui/tooltip';
import Web3Provider from '@/lib/web3/Web3Provider';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Web3Provider>
      <TooltipProvider>{children}</TooltipProvider>
    </Web3Provider>
  );
}
