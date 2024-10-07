'use client';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useSide } from '@/hooks/useSide';
import { formatNumber } from '@/lib/utils';
import { PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import MarketCardPurchase from './MarketCardPurchase';
// import Seesaw from "./Seesaw2";
// import MarketCardButtons from "./MarketCardButtons2";
// import ButtonWithSparkles from "@/components/ui2/SparkleButton";
import { useTradeType } from '@/hooks/useTradeType';
import { Stages } from '@/lib/web3/market';
import { motion } from 'framer-motion';
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
  betData: MarketData;
  bondData: MarketData;
  stage: Stages;
  isFront: boolean;
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
  betData,
  bondData,
  stage,
  isFront,
  // initialChoice="yesBet"
}: MarketCardContentProps) {
  const [side, setSide] = useSide();
  const [tradeType, setTradeType] = useTradeType();

  if (side && tradeType) {
    return (
      <MarketCardPurchase
        stage={stage}
        side={side}
        tradeType={tradeType}
        onBack={() => {
          setSide(undefined);
          setTradeType(undefined);
        }}
      />
    );
  }

  const maxAngle = 45; // in degrees
  // const angle = (bondData.yes - bondData.no) * maxAngle / 100;
  const netBond = bondData.no - bondData.yes;
  const angle = (netBond * maxAngle) / 100;

  return (
    <div className="relative">
      <CardContent className="py-0 px-0">
        {(() => {
          if (isFront) {
            return (
              <>
                {stage === Stages.Claim ? (
                  <ClaimUI betData={betData} />
                ) : (
                  <div
                    className={`${stage === Stages.Validate || stage === Stages.Dispute ? 'opacity-50' : ''} relative group`}
                  >
                    <div className="absolute bottom-20 inset-0 flex justify-between items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Badge variant="secondary" className="left-2 bg-green-500/75">
                        {formatNumber(betData.yes)}
                      </Badge>
                      <Badge variant="secondary" className="right-2 bg-red-500/75">
                        {formatNumber(betData.no)}
                      </Badge>
                    </div>

                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-40 group-hover:opacity-80 transition-opacity duration-300"
                    >
                      {/* <div className=""> */}

                      {/* <div className="relative"> */}
                      <RadialBarChart data={[betData]} innerRadius={70} outerRadius={85} startAngle={0} endAngle={180}>
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                          {/* <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 16}
                                  className="fill-foreground text-2xl"
                                >
                                  {betData.likelihood.toLocaleString()}%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 4}
                                  className="fill-muted-foreground"
                                >
                                  YES
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      /> */}
                        </PolarRadiusAxis>
                        <RadialBar dataKey="no" stackId="a" cornerRadius={4} className="fill-red-700" />
                        <RadialBar dataKey="yes" stackId="a" cornerRadius={4} className="fill-green-600" />
                      </RadialBarChart>
                    </ChartContainer>
                    <div className="absolute bottom-10 inset-0 flex flex-col items-center justify-center text-center mt-2">
                      <span className="text-2xl">{betData.likelihood.toLocaleString()}%</span>
                      <span className="text-xs text-muted-foreground">YES</span>
                    </div>
                  </div>
                )}

                <div className="flex-col gap-1 z-20 text-sm absolute bottom-5 left-0 right-0 text-center">
                  {/* Yes No buttons. Claim | Unbond buttons */}

                  {stage === Stages.Claim ? (
                    <ClaimButtons />
                  ) : (
                    <div className="w-full mx-auto grid grid-cols-2 gap-x-4 my-2">
                      <button
                        onClick={() => {
                          setSide('yes');
                          setTradeType('bet');
                        }}
                        disabled={stage === Stages.Validate || stage === Stages.Dispute}
                        className="yes-button bg-green-500 text-white px-6 py-0.5 rounded-md hover:bg-green-600 transition-colors duration-200 ease-in-out hover:scale-[1.02] disabled:hover:scale-[1] flex flex-col justify-center items-center h-auto"
                      >
                        <small className="font-normal">Bet</small> <span className="uppercase -mt-1">Yes</span>
                      </button>
                      <button
                        onClick={() => {
                          setSide('no');
                          setTradeType('bet');
                        }}
                        disabled={stage === Stages.Validate || stage === Stages.Dispute}
                        className="no-button bg-red-500 text-white px-6 py-0.5 rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out hover:scale-[1.02] disabled:hover:scale-[1] flex flex-col justify-center items-center h-auto"
                      >
                        <small className="font-normal">Bet</small> <span className="uppercase -mt-1">No</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            );
          } else if (!isFront) {
            return (
              <>
                {stage === Stages.Claim ? (
                  <ClaimUI betData={betData} />
                ) : (
                  <div className="relative group">
                    <div className="absolute bottom-20 inset-0 flex justify-between items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Badge variant="secondary" className="bg-green-500/75 mb-1">
                        {formatNumber(bondData.yes)}
                      </Badge>

                      <Badge variant="secondary" className="right-2 bg-red-500/75">
                        {formatNumber(bondData.no)}
                      </Badge>
                    </div>
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-40 group-hover:opacity-80 transition-opacity duration-300"
                    >
                      <div className="top-6 absolute left-0 right-0 flex flex-col items-center justify-center">
                        <div className="absolute left-0 right-0 flex justify-center items-center">
                          <motion.div className="transform w-20 h-[1px] border-t border-dashed border-green-500" />
                          <motion.div className="transform w-20 h-[1px] border-t border-dashed border-red-500" />
                        </div>

                        <motion.div
                          className={`transform z-20 rounded-xl top-8 w-40 h-[5px] ${netBond > 0 ? 'bg-red-600' : 'bg-green-600'}`}
                          style={{
                            transform: `rotate(${angle}deg)`,
                          }}
                          animate={{
                            rotate: angle,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                          }}
                        >
                          {/* Left side */}
                          {/* <div className="absolute left-0 transform -translate-y-full -translate-x-1/2 w-16 h-16 bg-blue-500 rounded-full"></div> */}

                          {/* Right side */}
                          {/* <div className="absolute right-0 transform -translate-y-full translate-x-1/2 w-16 h-16 bg-green-500 rounded-full"></div> */}
                        </motion.div>

                        {/* <div className="absolute">
  
                      <motion.div
                        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-[1px] border-t border-dashed bg-green-500/50"
                        /> */}
                        <div className="absolute left-0 right-0 flex justify-center items-center">
                          <motion.div
                            className="transform w-20 h-[1px] border-t border-dashed border-green-500"
                            style={{
                              boxShadow: angle < 0 ? '0 5px 12px 1px rgb(22, 163, 74)' : 'none',
                            }}
                          />
                          <motion.div
                            className="transform w-20 h-[1px] border-t border-dashed border-red-500"
                            style={{
                              boxShadow: angle > 0 ? '0 5px 12px 1px rgb(220, 38, 38)' : 'none',
                            }}
                          />
                        </div>
                        {/* </div> */}
                      </div>
                    </ChartContainer>
                    <div className="absolute bottom-10 inset-0 flex flex-col items-center justify-center text-center mt-2">
                      <span className={`${angle < 0 ? 'text-green-500' : 'text-red-500'} text-2xl`}>
                        {angle < 0 ? 'YES' : 'NO'}
                      </span>
                      <span
                        className={`${bondData.disputed ? 'bg-amber-600 text-white' : 'bg-grey-500/75 text-muted-foreground'} text-[9px] border rounded-full px-2`}
                      >
                        Disputed
                        {/* YES */}
                      </span>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex-col gap-1 z-20 text-sm absolute bottom-5 left-0 right-0 text-center">
                  {stage === Stages.Claim ? (
                    <ClaimButtons />
                  ) : (
                    <div className="w-full mx-auto grid grid-cols-2 gap-x-4 my-2">
                      <button
                        onClick={() => {
                          setSide('yes');
                          setTradeType('bond');
                        }}
                        // TODO: set disabled once ready
                        disabled={stage === Stages.Bet}
                        className="yes-button relative bg-purple-700 text-white px-6 py-0.5 rounded-md hover:bg-purple-500 transition-colors duration-200 ease-in-out hover:scale-[1.02] disabled:hover:scale-[1] flex flex-col justify-center items-center h-auto"
                      >
                        <small className="font-normal">Bond</small> <span className="uppercase -mt-1">Yes</span>
                        {stage === Stages.Dispute ? (
                          <div className="absolute top-0 w-[100%] h-full bg-shimmer-gradient opacity-70 animate-shimmer"></div>
                        ) : (
                          <></>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSide('no');
                          setTradeType('bond');
                        }}
                        // TODO: set disabled once ready
                        disabled={stage === Stages.Bet}
                        className="no-button relative bg-purple-700 text-white px-6 py-0.5 rounded-md hover:bg-purple-500 transition-colors duration-200 ease-in-out hover:scale-[1.02] disabled:hover:scale-[1] flex flex-col justify-center items-center h-auto"
                      >
                        <small className="font-normal">Bond</small> <span className="uppercase -mt-1">No</span>
                        {stage === Stages.Dispute ? (
                          <div className="absolute top-0 w-[100%] h-full bg-shimmer-gradient opacity-70 animate-shimmer"></div>
                        ) : (
                          <></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            );
          }
        })()}
      </CardContent>
    </div>
  );
}
