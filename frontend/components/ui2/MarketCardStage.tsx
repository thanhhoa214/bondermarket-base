import { Stages } from '@/lib/web3/market';
import React from 'react';

interface CirclePieProps {
  stage?: Stages;
  size?: number;
  backgroundColor?: string;
  progressColor?: string;
  hoverBackgroundColor?: string;
  hoverProgressColor?: string;
}

const QuadrantCircle = ({ size }: { size: number }) => (
  <div style={{ width: `${size}px`, height: `${size}px` }} className="relative cursor-default">
    <div className="absolute inset-0 border border-gray-300 rounded-full" style={{ borderWidth: '0.5px' }}></div>
    <div
      className="absolute top-0 left-0 w-1/2 h-1/2 border-r border-b border-gray-300"
      style={{ borderRightWidth: '0.5px', borderBottomWidth: '0.5px' }}
    ></div>
    <div
      className="absolute top-0 right-0 w-1/2 h-1/2 border-l border-b border-gray-300"
      style={{ borderLeftWidth: '0.5px', borderBottomWidth: '0.5px' }}
    ></div>
    <div
      className="absolute bottom-0 left-0 w-1/2 h-1/2 border-r border-t border-gray-300"
      style={{ borderRightWidth: '0.5px', borderTopWidth: '0.5px' }}
    ></div>
    <div
      className="absolute bottom-0 right-0 w-1/2 h-1/2 border-l border-t border-gray-300"
      style={{ borderLeftWidth: '0.5px', borderTopWidth: '0.5px' }}
    ></div>
  </div>
);

const CirclePie: React.FC<CirclePieProps> = ({ stage, size = 100 }) => {
  //   const [isHovered, setIsHovered] = useState(false);

  const radius = size / 2;
  const circumference = radius * 2 * Math.PI;

  let percentage: number;
  //   const current_time = new Date();

  switch (stage) {
    case Stages.Bet:
      // TODO: pull expiry time from contract
      const start_time = new Date(/* TODO: Get start time from contract */);
      const end_time = new Date(/* TODO: Get end time from contract */);
      const current_time_bet = new Date();

      const total_duration = end_time.getTime() - start_time.getTime();
      const elapsed_duration = current_time_bet.getTime() - start_time.getTime();

      if (total_duration === 0) {
        percentage = 12.5; // TODO: remove later - dummy value
      } else {
        percentage = (elapsed_duration / total_duration) * 25;
      }

      // Ensure percentage doesn't exceed 25
      // percentage = Math.min(calculated_percentage, 25);
      // percentage = 25;
      break;
    case Stages.Validate:
      // TODO: pull expiry time from contract
      const time_when_change_to_validate = new Date(/* TODO: Get start time from contract */);
      const validate_end_time = new Date(/* TODO: Get end time from contract */);
      const current_time_validate = new Date();

      const total_duration_2 = validate_end_time.getTime() - time_when_change_to_validate.getTime();
      const elapsed_duration_2 = current_time_validate.getTime() - time_when_change_to_validate.getTime();

      if (total_duration_2 === 0) {
        percentage = 37.5; // TODO: remove later - dummy value
      } else {
        percentage = 25 + (elapsed_duration_2 / total_duration_2) * 25;
      }
      // Ensure percentage doesn't exceed 25
      // percentage = 25 + Math.min(calculated_percentage_2, 50);

      // percentage = 50;
      break;
    case Stages.Dispute:
      // TODO: pull expiry time from contract
      const time_when_change_to_dispute = new Date(/* TODO: Get start time from contract */);
      const dispute_end_time = new Date(/* TODO: Get end time from contract */);
      const current_time_dispute = new Date();

      const total_duration_3 = dispute_end_time.getTime() - time_when_change_to_dispute.getTime();
      const elapsed_duration_3 = current_time_dispute.getTime() - time_when_change_to_dispute.getTime();

      if (total_duration_3 === 0) {
        percentage = 62.5; // TODO: remove later - dummy value
      } else {
        percentage = 50 + (elapsed_duration_3 / total_duration_3) * 25;
      }

      // Ensure percentage doesn't exceed 75
      // percentage = 50 + Math.min(calculated_percentage_3, 75);

      // percentage = 75;
      break;
    case Stages.Claim:
      // TODO: pull expiry time from contract
      const time_when_change_to_claim = new Date(/* TODO: Get start time from contract */);
      const claim_end_time = new Date(/* TODO: Get end time from contract */);
      const current_time_claim = new Date();

      const total_duration_4 = claim_end_time.getTime() - time_when_change_to_claim.getTime();
      const elapsed_duration_4 = current_time_claim.getTime() - time_when_change_to_claim.getTime();

      if (total_duration_4 === 0) {
        percentage = 87.5; // TODO: remove later - dummy value
      } else {
        percentage = 75 + (elapsed_duration_4 / total_duration_4) * 25;
      }
      // Ensure percentage doesn't exceed 100
      // percentage = 75 + Math.min(calculated_percentage_4, 100);
      // For Claim stage, we'll set it to 100% immediately
      // percentage = 100;
      break;
    default:
      percentage = 0;
      break;
  }

  // const percentage = 40; // replace with math above

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const angle = (percentage / 100) * 360;
  const largeArcFlag = percentage > 50 ? 1 : 0;

  const x = radius + radius * Math.cos((angle - 90) * (Math.PI / 180));
  const y = radius + radius * Math.sin((angle - 90) * (Math.PI / 180));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      //   onMouseEnter={() => setIsHovered(true)}
      //   onMouseLeave={() => setIsHovered(false)}
    >
      <circle cx={radius} cy={radius} r={radius} className="fill-gray-200" />
      {percentage > 0 && (
        <path
          d={`M${radius},${radius} L${radius},0 A${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} Z`}
          className="fill-blue-500"
        />
      )}
    </svg>
  );
};

const MarketCardStage = ({ stage, size }: { stage?: Stages; size: number }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <CirclePie stage={stage} size={size} />
        <div className="absolute top-0 left-0 w-full h-full">
          <QuadrantCircle size={size} />
        </div>
      </div>
      <span className="text-[8px] text-muted-foreground">{Stages[stage ?? 0]}</span>
    </div>
  );
};

export default MarketCardStage;
