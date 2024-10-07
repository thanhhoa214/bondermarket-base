import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PoolTitle() {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-col items-start w-full">
            <div className="flex text-2xl font-light">Deposit to get BonderTokens </div>
            <div className="font-light text-base text-muted-foreground">
              BonderTokens accrue yield and is used to secure BonderMarket
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col my-2 rounded-xl gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center sm:items-start mx-auto sm:mx-0">
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-sm text-center font-light min-h-[40px]">
                  Deposit USDC in the BonderPool and get BonderTokens
                </div>

                <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
              </div>

              <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-sm text-center font-light min-h-[40px]">BonderTokens accrue fees from markets</div>

                <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
              </div>

              {/* 1 div for players */}
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-sm text-center font-light min-h-[40px]">Bond to disputed markets to earn more</div>

                <div className="w-[160px] h-[160px] bg-grey-500 border mt-2">{/* Insert diagram */}</div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
