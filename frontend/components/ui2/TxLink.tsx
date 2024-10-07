import { cn, shortenAddress } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { useChainId, useChains } from 'wagmi';
import { badgeVariants } from '../ui/badge';

export default function TxLink({
  hash,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & { hash: string | null }) {
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find((chain) => chain.id === chainId);

  if (!hash) return null;
  return (
    <Link
      href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
      target="_blank"
      className={cn(badgeVariants({ variant: 'outline' }), className)}
      {...props}
    >
      {children ?? shortenAddress(hash)}
    </Link>
  );
}
