import { cn } from '@/lib/utils';
import { Loader2, LucideProps } from 'lucide-react';
import { HTMLProps } from 'react';

export default function LoaderIcon({ className, ...props }: HTMLProps<LucideProps & SVGSVGElement>) {
  return <Loader2 className={cn('animate-spin', className)} {...props} />;
}
