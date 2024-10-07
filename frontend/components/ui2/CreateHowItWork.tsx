export default function CreateHowItWork() {
  return (
    <div className="flex flex-col my-2 rounded-xl gap-4">
      {/* Gentle Degen switch */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center sm:items-start mx-auto sm:mx-0">
        {/* 1 div for creators */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-sm text-center font-light min-h-[40px]">
            Creators mint a CreatorNFT when creating their first market
          </div>

          <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
        </div>

        {/* 1 div for bonders */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-sm text-center font-light min-h-[40px]">More bets = Higher rank</div>

          <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
        </div>

        {/* 1 div for players */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-sm text-center font-light min-h-[40px]">Higher rank = Can set more fees</div>

          <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
        </div>
      </div>
    </div>
  );
}
