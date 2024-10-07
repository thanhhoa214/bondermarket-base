import { PropsWithChildren } from 'react';

export default function InProgress({ children }: PropsWithChildren) {
  return (
    <div className="pointer-events-none relative">
      <div className="opacity-20">{children}</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl tracking-widest font-bold text-foreground/40">
        Release soon
      </div>
    </div>
  );
}
