'use client';

import { endSession, startSession } from '@/app/actions/user.actions';
import { emojiAvatarForAddress } from '@/lib/web3/emojiAvatarForAddress';
import { useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { ArrowLeftRight } from 'lucide-react';
import { useEffect } from 'react';
import { useAccount, useChainId, useChains } from 'wagmi';
import { Button, ButtonProps } from '../ui/button';

function truncateAddress(address?: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const ConnectWalletButton = (props: ButtonProps) => {
  const account = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(account?.address ?? '');
  const chains = useChains();
  const chainId = useChainId();
  const chain = chains.find((c) => c.id === chainId);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  useEffect(() => {
    if (account.isConnected && account.address) startSession(account.address);
    else endSession();
  }, [account.isConnected, account.address, chainId]);

  if (account.isConnected) {
    return (
      <div className="inline-flex items-center justify-end gap-2">
        <Button
          variant={'outline'}
          onClick={() => openAccountModal?.()}
          className="px-1 gap-1 border-primary bg-primary/30 hover:bg-primary/60"
        >
          <span
            className="h-7 w-7 rounded-full inline-flex justify-center items-center text-2xl hover:scale-110 m-1"
            style={{ backgroundColor: `${backgroundColor}90` }}
          >
            {emoji}
          </span>

          <span className="inline-flex flex-col text-left pr-3">
            <strong className="font-semibold text-sm leading-4">
              {chain?.name}
              <ArrowLeftRight
                size={14}
                className="ml-1 inline-block hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  openChainModal?.();
                }}
              />
            </strong>
            <span className="text-xs leading-3">{truncateAddress(account.address)}</span>
          </span>
        </Button>
      </div>
    );
  }
  return (
    <Button
      {...props}
      onClick={() => {
        console.log('openConnectModal');
        openConnectModal?.();
      }}
    >
      Connect Wallet
    </Button>
  );
};
