import { cn } from '@/lib/utils';
import { SVGProps } from 'react';

export default function LogoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 62 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block', className)}
      {...props}
    >
      <path d="M29.0328 1L42.8033 8.37705L13.7869 24.6066V32.9672L1 24.6066V17.2295L29.0328 1Z" fill="currentColor" />
      <path d="M13.7869 43.2951L1 35.918V50.6721L13.7869 58.0492V43.2951Z" fill="currentColor" />
      <path d="M61 19.6885L47.7213 11.8197V27.5574L61 34.4426V19.6885Z" fill="currentColor" />
      <path
        d="M61 45.7541L47.7213 37.8852V47.2295L20.6721 61.9836L32.9672 69.3607L61 52.6393V45.7541Z"
        fill="currentColor"
      />
      <path d="M29.0328 1L42.8033 8.37705L13.7869 24.6066V32.9672L1 24.6066V17.2295L29.0328 1Z" stroke="currentColor" />
      <path d="M13.7869 43.2951L1 35.918V50.6721L13.7869 58.0492V43.2951Z" stroke="currentColor" />
      <path d="M61 19.6885L47.7213 11.8197V27.5574L61 34.4426V19.6885Z" stroke="currentColor" />
      <path
        d="M61 45.7541L47.7213 37.8852V47.2295L20.6721 61.9836L32.9672 69.3607L61 52.6393V45.7541Z"
        stroke="currentColor"
      />
    </svg>
  );
}
