export default function HomeHowItWork() {
  return (
    <div className="flex flex-col my-2 rounded-xl gap-4">
      {/* Gentle Degen switch */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center sm:items-start mx-auto sm:mx-0">
        {/* 1 div for creators */}
        <div className="flex flex-col flex-1">
          <div className="text-xl font-light">Creators</div>

          <div className="flex flex-col text-sm font-light gap-2 min-w-[240px] min-h-[80px] mt-2">
            <p>Create 2-sided markets</p>
            <p>Fees increase with deposits</p>
            <p>Trade creator tokens</p>
          </div>
        </div>

        {/* 1 div for bonders */}
        <div className="flex flex-col flex-1">
          <div className="text-xl font-light">Bonders</div>

          <div className="flex flex-col text-sm font-light gap-2 min-w-[240px] min-h-[80px] mt-2">
            <p>Deposit USDC to be a Bonder</p>
            <p>Bonders earn fees</p>
            <p>Bond to disputed markets and earn</p>
          </div>
        </div>

        {/* 1 div for players */}
        <div className="flex flex-col flex-1">
          <div className="text-xl font-light">Players</div>

          <div className="flex flex-col text-sm font-light gap-2 min-w-[240px] min-h-[80px] mt-2">
            <p>Bet on beliefs</p>
            <p>Provide liquidity to earn fees</p>
            <p>Trade with liquidity pool</p>
          </div>
        </div>
      </div>
    </div>
  );
}
