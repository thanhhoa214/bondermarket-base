'use client';

import { endSession, startSession } from '@/app/actions/user.actions';
import { cn } from '@/lib/utils';
import { emojiAvatarForAddress } from '@/lib/web3/emojiAvatarForAddress';
import { Avatar, EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { useEffect } from 'react';
import { useAccount, useChainId, useChains } from 'wagmi';

const DefaultWalletAvatar = ({ address = '', className = '' }: { address?: string; className?: string }) => {
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address);
  return (
    <span
      className={cn('h-6 w-6 rounded-full inline-flex justify-center items-center text-lg', className)}
      style={{ backgroundColor: `${backgroundColor}90` }}
    >
      {emoji}
    </span>
  );
};
export const ConnectWalletButton = ({ className }: { className?: string }) => {
  const account = useAccount();
  const chains = useChains();
  const chainId = useChainId();
  const chain = chains.find((c) => c.id === chainId);

  useEffect(() => {
    if (account.isConnected && account.address) startSession(account.address);
    else endSession();
  }, [account.isConnected, account.address]);

  return (
    <Wallet>
      <ConnectWallet
        className={cn(
          'h-10 px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105',
          className,
        )}
      >
        <Avatar className="h-6 w-6" defaultComponent={<DefaultWalletAvatar address={account.address} />} />

        <span className="inline-flex flex-col text-left pr-2 -mt-1">
          <strong className="text-foreground/70 font-normal text-xs leading-4">{chain?.name}</strong>
          <Name className="text-foreground text-xs leading-3 font-semibold" />
        </span>
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <EthBalance />
        </Identity>
        <WalletDropdownBasename />
        <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
          Wallet
        </WalletDropdownLink>
        <WalletDropdownFundLink />
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
};
