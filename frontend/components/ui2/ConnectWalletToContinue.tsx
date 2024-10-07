'use client';
import { cn } from '@/lib/utils';
import { Wallet } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useAccount } from 'wagmi';
import { ConnectWalletButton } from './ConnectWalletButton';

export default function ConnectWalletToContinue({
  children,
  className,
  serverAddress,
}: HTMLAttributes<HTMLDivElement> & {
  serverAddress?: string;
}) {
  const { isConnected, isConnecting } = useAccount();

  if (isConnected || !!serverAddress) return children;

  return (
    <section className={cn('h-full w-full flex-grow flex flex-col justify-center items-center text-center', className)}>
      {isConnecting ? (
        <>
          <h1 className="text-2xl font-bold">Wallet connecting...</h1>
          <p className="text-muted-foreground">Please wait while we connect to your wallet.</p>
        </>
      ) : (
        <>
          <Wallet size={60} className="mb-2" />
          <h1 className="text-2xl font-bold">Connect your wallet</h1>
          <p className="text-muted-foreground">You need to connect your wallet to continue.</p>
          <ConnectWalletButton className="mt-6" />
        </>
      )}
    </section>
  );
}
