import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export function useConnectFirst(func: () => Promise<void>) {
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    if (!connectModalOpen) {
      if (isConnected) {
        func();
        setTriggered(false);
      }
    }
  }, [isConnected, connectModalOpen, func, triggered]);

  return () => {
    if (!isConnected) {
      openConnectModal?.();
      setTriggered(true);
    } else {
      return func();
    }
  };
}
