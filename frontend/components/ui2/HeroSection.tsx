'use client';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function CarouselCard() {
  // const [showModal, setShowModal] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);

  return (
    <>
      {/* <div
        className="relative w-[300px] h-[200px] rounded-lg bg-muted shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
        // onClick={() => setShowModal(true)}
      >
      </div> */}

      <div className="flex flex-col my-2 border p-4 rounded-xl gap-4">
        {/* Gentle Degen switch */}

        <div className="flex justify-between">
          <div className="flex text-2xl">
            Earn by
            {/* TODO: Add animation
          creating markets, providing liquidity, betting on right outcomes, being a Bonder, bonding when duty calls */}
          </div>

          <div className="flex ">
            <div className="flex flex-row justify-center gap-2 text-xs">
              <span
                className={`text-sm transition-colors duration-200 ${showAlternative ? 'text-muted-foreground' : 'text-primary'}`}
              >
                Gentle
              </span>
              <Switch checked={showAlternative} onCheckedChange={setShowAlternative} />
              <span
                className={`text-sm transition-colors duration-200 ${showAlternative ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Degen
              </span>
            </div>
          </div>
        </div>

        {/* Card collection */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* What's this */}
          <div className="flex flex-col flex-1">
            <div className="text-xl">What&apos;s this</div>

            <div className="min-w-[240px] mt-2 border rounded-lg p-4">
              <div className="min-h-[120px] flex flex-col gap-1 p-1">
                {!showAlternative ? (
                  <div className="grid gap-1">
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Another fork?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>AI?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Decentralized?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Fully onchain?</p>
                      <p>✅</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-1">
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Got yield?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Got tokens?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Got NFTs?</p>
                      <p>✅</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto]">
                      <p>Got native token?</p>
                      <p>✅</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* What's this */}
          <div className="flex flex-col flex-1">
            <div className="text-xl">What now</div>

            <div className="min-w-[240px] mt-2 border rounded-lg p-4">
              <div className="min-h-[120px] p-2">
                {!showAlternative ? (
                  <div className="flex flex-col gap-2">
                    <p>Get test tokens to play</p>
                    <p>
                      Get{' '}
                      <a href="https://t.me/agileape" className="linked-links">
                        invites
                      </a>{' '}
                      to create market
                    </p>
                    <p>
                      Join the{' '}
                      <a href="https://t.me/agileape" className="linked-links">
                        community
                      </a>{' '}
                    </p>
                    {/* <p>Fully onchain? ✅</p> */}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p>Bettors play</p>
                    <p>Creators earn fees</p>
                    <p>Bonders earn fees</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="text-xl">How this works</div>

            <div className="min-w-[240px] mt-2 border rounded-lg p-4">
              <div className="min-h-[120px] flex flex-col items-baseline gap-2 p-2">
                {!showAlternative ? (
                  <div className="">We are redrawing incentive systems to create better web3 markets</div>
                ) : (
                  <div>Let&apos;s go build and run our own markets</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HeroSection() {
  {
    /* v1
<div className="pt-4 pb-12 flex flex-col items-center">
<h1 className="text-4xl font-bold text-center">Welcome to Bondermarket</h1>
<p className="md:max-w-lg text-center text-muted-foreground text-base">
  Bondermarket is a decentralized prediction market run by{' '}
  <span className="text-yellow-900 dark:text-yellow-400">Bonders</span> - where anyone can create any market
  permissionlessly
</p>

<div className="flex gap-2 justify-center mt-4">
  <Link href="pool">
    <Button size={'lg'}>Be a Bonder</Button>
  </Link>
  <Link href="/">
    <Button size={'lg'} variant={'link'}>
      Learn more
    </Button>
  </Link>
</div>
</div> */
  }
  return (
    <div className="flex flex-col">
      <div className="text-4xl font-light text-left my-6">Create and bet on anything</div>

      <CarouselCard />
    </div>
  );
}
