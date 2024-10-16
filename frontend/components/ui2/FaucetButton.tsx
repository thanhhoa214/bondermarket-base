'use client';
import { faucetUser, getUser } from '@/app/actions/user.actions';
import { useMyUsdcAmount } from '@/hooks/web3/useMyUsdcAmount';
import { moneyFormatter } from '@/lib/utils';
import usdcSvg from '@/public/tokens/usdc.svg';
import { useQuery } from '@tanstack/react-query';
import { delay } from 'lodash-es';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'sonner';
import { useWindowSize } from 'usehooks-ts';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';

export default function FaucetButton() {
  const account = useAccount();
  const [pending, setPending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const {
    refetch,
    isLoading,
    data: userResponse,
  } = useQuery({
    queryKey: ['user', account.address],
    queryFn: () => account.address && getUser(account.address),
    enabled: !!account.address,
  });
  const { data: usdc } = useMyUsdcAmount();

  if (!account.address) return null;
  if (isLoading) return null;
  if (userResponse?.success && userResponse?.data?.faucetted)
    return (
      <span className="inline-flex flex-col text-xs">
        Balance
        <span className="text-muted-foreground">
          <strong>{moneyFormatter(usdc || 0)}</strong> {''}
          <span className="text-[10px]">BONDERUSDC</span>
        </span>
      </span>
    );

  async function faucet() {
    if (!account.address) return;
    setPending(true);
    const result = await faucetUser(account.address);
    if (result.success) {
      toast.success('Faucet successful');
      setShowConfetti(true);
      delay(() => {
        setShowConfetti(false);
        refetch();
      }, 3000);
    } else {
      toast.error(result.error.message);
    }
    setPending(false);
  }
  return (
    <>
      <Button variant={'ghost'} onClick={faucet} className="gap-1 border">
        {pending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Image src={usdcSvg} alt="USDC" height={20} width={20} />
        )}
        Faucet
      </Button>

      {showConfetti && <Confetti width={width} height={height} className="!z-[51]" />}
    </>
  );
}
