'use client';

export default function PortfolioTitle() {
  return (
    <div className="flex flex-col justify-center items-center sm:items-start w-full mt-4 border-b">
      <div className="flex text-2xl text-center font-light">Manage all your positions here</div>
      <div className="font-light text-center text-base text-muted-foreground">
        Bets | Liquidity positions | Created markets | BonderTokens | Profile{' '}
      </div>
    </div>
  );
}
