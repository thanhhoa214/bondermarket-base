import { toast } from 'sonner';
import { useAccount } from 'wagmi';

export function useConnectFirst(func: () => Promise<void>) {
  const { isConnected } = useAccount();

  return () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first');
    } else {
      return func();
    }
  };
}
