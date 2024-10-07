import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { useRef } from 'react';

import { useOutsideClick } from '../../hooks/useOutclideClick';

type ModalType = {
  action: string;
  toggle: () => void;
  // might have to pass other variables from received transactions
};

const FaucetContent = () => {
  return <div>You can now play the markets, or create new markets</div>;
};

const CreateMarketContent = () => {
  return <div>You have created a new market!</div>;
};

const BuyYesContent = () => {
  return <div>💓✅ You bought YES!</div>;
};

const BuyNoContent = () => {
  return <div>💓❌ You bought NO!</div>;
};

const DepositYesContent = () => {
  return <div>👉✅ You are in YES pool!</div>;
};

const DepositNoContent = () => {
  return <div>👉❌ You are in NO pool!</div>;
};

const SellYesContent = () => {
  return <div>💔✅ You sold YES!</div>;
};

const SellNoContent = () => {
  return <div>💔❌ You sold NO!</div>;
};

const DepositPoolContent = () => {
  return <div>🟣 You are a Bonder!</div>;
};

const WithdrawPoolContent = () => {
  return <div>😥 You are out?</div>;
};

const BondYesContent = () => {
  return <div>🟣✅ You bond to YES!</div>;
};

const BondNoContent = () => {
  return <div>🟣❌ You bond to NO!</div>;
};

const ClaimContent = () => {
  return <div>💰 You claimed!</div>;
};

const UnbondContent = () => {
  return <div>🟣👍 You unbonded!</div>;
};

const titleMapping: { [key: string]: string } = {
  faucet: '🔔 You got free money!',
  createMarket: '🎟 New market created!',
  buyYes: '💓✅ You bought YES!',
  buyNo: '💓❌ You bought NO!',
  depositYes: '👉✅ You are in YES pool!',
  depositNo: '👉❌ You are in NO pool!',
  sellYes: '💔✅ You sold YES!',
  sellNo: '💔❌ You sold NO!',
  depositPool: '🟣 You are a Bonder!',
  withdrawPool: '😥 You are out?',
  bondYes: '🟣✅ You bond to YES',
  bondNo: '🟣❌ You bond to NO',
  claim: '💰 You claimed!',
  unbond: '🟣👍 You unbonded!',
};

const contentMapping: { [key: string]: JSX.Element } = {
  faucet: <FaucetContent />,
  createMarket: <CreateMarketContent />,
  buyYes: <BuyYesContent />,
  buyNo: <BuyNoContent />,
  depositYes: <DepositYesContent />,
  depositNo: <DepositNoContent />,
  sellYes: <SellYesContent />,
  sellNo: <SellNoContent />,
  depositPool: <DepositPoolContent />,
  withdrawPool: <WithdrawPoolContent />,
  bondYes: <BondYesContent />,
  bondNo: <BondNoContent />,
  claim: <ClaimContent />,
  unbond: <UnbondContent />,
};

const Modal: FC<ModalType> = ({ action, toggle }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, () => toggle());

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            ref={modalRef}
            className="h-[40rem] md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-[80%] mx-auto bg-slate-200 dark:bg-slate-800 outline-none focus:outline-none overflow-auto"
          >
            <div className="overflow-auto">
              <button className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span
                  className="text-white m-1 h-6 w-6 text-2xl outline-none focus:outline-none flex justify-center items-center"
                  onClick={toggle}
                >
                  <X className="text-black" />
                </span>
              </button>
              <div className="items-center pt-10">
                <ScrollArea className="h-[450px] md:h-[650px] rounded-md p-2">
                  <div className="w-[85%] mx-auto flex flex-col p-2 items-center text-center ">
                    <div className="">{titleMapping[action]}</div>
                    <div>{contentMapping[action]}</div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-4"></div>
    </>
  );
};

export default Modal;
