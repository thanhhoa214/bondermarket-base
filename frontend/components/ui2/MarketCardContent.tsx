'use client';
import { ChartConfig } from '@/components/ui/chart';
import { useSide } from '@/hooks/useSide';
import { formatNumber } from '@/lib/utils';
import MarketCardPurchase from './MarketCardPurchase';
// import Seesaw from "./Seesaw2";
// import MarketCardButtons from "./MarketCardButtons2";
// import ButtonWithSparkles from "@/components/ui2/SparkleButton";
import { Button } from '@/components/ui/button';
import { useTradeType } from '@/hooks/useTradeType';
import { Stages } from '@/lib/web3/market';
import { CircleAlert, CircleCheck, CircleHelp, CircleX } from 'lucide-react';

// export type Choice = 'yes' | 'no';
// export type CardType = 'bet' | 'bond';

// // Maps specific strings to Side and CardType
// const stringToSideTypeMap: Record<string, { choice: Choice; type: CardType }> = {
//   yesBet: { choice: 'yes', type: 'bet' },
//   noBet: { choice: 'no', type: 'bet' },
//   yesBond: { choice: 'yes', type: 'bond' },
//   noBond: { choice: 'no', type: 'bond' },
// };

// export function useSide(input?: string) {
//   const [state, setState] = useState<{ choice: Choice; type: CardType } | undefined>(
//     input ? stringToSideTypeMap[input] : undefined
//   );

//   return [state?.choice, state?.type, setState] as const;
// }

const chartConfig: ChartConfig = {
  yes: { label: 'Yes', color: '#b91c1c' },
  no: { label: 'No', color: '#121322' },
} satisfies ChartConfig;

type MarketData = {
  type: string;
  yes: number;
  no: number;
  likelihood: number;
  total: number;
  result?: number;
  disputed?: boolean;
};

interface MarketCardContentProps {
  yesPercentage: number;
  noPercentage: number;
  yesTotalMinted: number;
  noTotalMinted: number;
  phase: Stages;
  betId: bigint;
  // initialChoice?: Side;
}

const ClaimUI = ({ betData }: { betData: MarketData }) => (
  <div className="relative group">
    <div className="flex flex-col items-center mx-auto aspect-square w-40 group-hover:opacity-80 transition-opacity duration-300 text-2xl">
      {betData.result === 1 ? (
        <CircleCheck className="text-green-500" size={50} />
      ) : betData.result === 2 ? (
        <CircleX className="text-red-500" size={50} />
      ) : betData.result === 3 ? (
        <CircleAlert className="text-purple-500" size={50} />
      ) : (
        <CircleHelp className="text-grey-500" size={50} />
      )}

      <div className="absolute bottom-10 inset-0 flex flex-col items-center justify-center text-center mt-2">
        <span
          className={`${
            betData.result === 1
              ? 'text-green-500'
              : betData.result === 2
                ? 'text-red-500'
                : betData.result === 3
                  ? 'text-purple-500'
                  : 'text-gray-500'
          } text-2xl`}
        >
          {betData.result === 1 ? 'YES' : betData.result === 2 ? 'NO' : betData.result === 3 ? 'Null' : 'TETT'}
        </span>
      </div>
    </div>
  </div>
);

const ClaimButtons = () => {
  const claimHandler = () => {
    /*
    const { write: claim, isLoading: isClaimLoading } = useContractWrite({
    address: '0x...', // Replace with your contract address
    abi: [...], // Replace with your contract ABI
    functionName: 'claim',
  });

  if (isClaimLoading) {
    console.log('Claiming...');
  }

  return () => {
    claim();
  };

  */
  };

  const unbondHandler = () => {
    /*
    const { write: claim, isLoading: isClaimLoading } = useContractWrite({
    address: '0x...', // Replace with your contract address
    abi: [...], // Replace with your contract ABI
    functionName: 'claim',
  });

  if (isClaimLoading) {
    console.log('Claiming...');
  }

  return () => {
    claim();
  };

  */
  };
  return (
    <div className="w-full mx-auto grid grid-cols-2 gap-x-4 my-2">
      <button
        onClick={() => claimHandler()}
        className="bg-purple-500 text-white px-6 py-0.5 rounded-md hover:bg-green-600 transition-colors duration-200 ease-in-out hover:scale-[1.02] flex flex-col justify-center items-center h-auto"
      >
        <small className="font-normal">Claim</small> <span className="uppercase -mt-1">$$$$</span>
      </button>
      <button
        onClick={() => unbondHandler()}
        className="bg-violet-500 text-white px-6 py-0.5 rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out hover:scale-[1.02] flex flex-col justify-center items-center h-auto"
      >
        <small className="font-normal">Unbond</small> <span className="uppercase -mt-1">-</span>
      </button>
    </div>
  );
};

export default function MarketCardContent({
  yesPercentage,
  noPercentage,
  yesTotalMinted,
  noTotalMinted,
  phase,
  betId,
}: MarketCardContentProps) {
  const [side, setSide] = useSide();
  const [tradeType, setTradeType] = useTradeType();

  if (side && tradeType) {
    return (
      <MarketCardPurchase
        betId={betId}
        stage={phase}
        side={side}
        tradeType={tradeType}
        onBack={() => {
          setSide(undefined);
          setTradeType(undefined);
        }}
      />
    );
  }

  return (
    <div className="relative flex flex-col justify-center items-center py-2">
      {/* <MarketCardContent betData={betData} bondData={bondData} phase={phase} /> */}
      {/* TODO: Only styled Bet for now. To style below later */}
      <>
        <div className="flex flex-col justify-center items-center mb-2">
          <span className={`text-2xl font-bold text-end ${yesPercentage >= 50 ? 'text-positive' : 'text-negative'}`}>
            {formatNumber(yesPercentage)}
          </span>
          <span className="text-xs text-muted-foreground">% chance</span>
        </div>

        <div className="w-[320px] flex flex-col gap-2">
          <div>
            <div className="w-full flex justify-between items-center pointer-events-none z-20 opacity-20 transition-opacity duration-300">
              <span className="text-xs text-positive">{formatNumber(yesPercentage)}</span>
              <span className="text-xs text-negative">{formatNumber(noPercentage)}</span>
            </div>
            <div className="relative w-full h-2 bg-border rounded-full overflow-hidden group">
              <div
                className={`absolute left-0 top-0 h-full ${yesPercentage >= 50 ? 'bg-positive' : 'bg-positive/10'}`}
                style={{ width: `${yesPercentage}%` }}
              ></div>
              <div
                className={`absolute right-0 top-0 h-full ${yesPercentage >= 50 ? 'bg-negative/10' : 'bg-negative'}`}
                style={{ width: `${noPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              // disabled={true}
              variant="yes"
              size="bet"
              onClick={() => {
                setSide('yes');
                setTradeType('bet');
              }}
            >
              <div className="flex flex-col">
                <span className="block relative top-1">Yes</span>
                <span className="block text-[9px]">${Number(yesTotalMinted)}</span>
              </div>
            </Button>
            <Button
              variant="no"
              size="bet"
              onClick={() => {
                setSide('no');
                setTradeType('bet');
              }}
            >
              <div className="flex flex-col">
                <span className="block relative top-1">No</span>
                <span className="block text-[9px]">${Number(noTotalMinted)}</span>
              </div>
            </Button>
          </div>

          <div className="relative w-full h-1 bg-border rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-[#265CFF]/10" style={{ width: `50%` }}></div>
            <div className="absolute right-0 top-0 h-full bg-[#AA00FF]/10" style={{ width: `50%` }}></div>
          </div>
        </div>
      </>
    </div>
  );
}
