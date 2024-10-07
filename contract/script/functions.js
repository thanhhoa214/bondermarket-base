import { ethers, ContractFactory } from "ethers";

import { BonderBaseSepoliaUSDCAbi } from "./abi.js";
import { BonderBaseSepoliaUSDCByteCode } from "./abi.js";
import { BonderPoolAbi } from "./abi.js";
import { BonderPoolByteCode } from "./abi.js";
import { PairLPFactoryAbi } from "./abi.js";
import { PairLPFactoryByteCode } from "./abi.js";
import { BetFactoryAbi } from "./abi.js";
import { BetFactoryByteCode } from "./abi.js";
import { PrivateBetFactoryAbi } from "./abi.js";
import { PrivateBetFactoryJsonByteCode } from "./abi.js";
import { RouterAbi } from "./abi.js";
import { RouterByteCode } from "./abi.js";
import { BaseSepoliaQuiknodeProvider } from "./abi.js";
import { BetTokenERC20Abi } from "./abi.js";

import { BonderBaseSepoliaUSDCAddr } from "./abi.js";
import { BonderPoolAddr } from "./abi.js";
import { BonderV1PairLPFactoryAddr } from "./abi.js";
import { BonderV1BetFactoryAddr } from "./abi.js";
import { BonderV1PrivateBetFactoryAddr } from "./abi.js";
import { BonderV1RouterAddr } from "./abi.js";
import { BonderV1PairJsonAbi } from "./abi.js";

// const deployerKey = [ADD PRIVATE KEY];

async function runFunctions() {
  const blockNumber = await BaseSepoliaQuiknodeProvider.getBlock();
  console.log("Current block.timestamp:", blockNumber.timestamp); //1723537874

  const wallet = new ethers.Wallet(deployerKey, BaseSepoliaQuiknodeProvider);

  const baseUSDCContract = new ethers.Contract(
    BonderBaseSepoliaUSDCAddr,
    BonderBaseSepoliaUSDCAbi,
    wallet
  );
  const bonderPoolContract = new ethers.Contract(
    BonderPoolAddr,
    BonderPoolAbi,
    wallet
  );
  const pairLpFactoryContract = new ethers.Contract(
    BonderV1PairLPFactoryAddr,
    PairLPFactoryAbi,
    wallet
  );
  const betFactoryContract = new ethers.Contract(
    BonderV1BetFactoryAddr,
    BetFactoryAbi,
    wallet
  );
  const privateBetFactoryContract = new ethers.Contract(
    BonderV1PrivateBetFactoryAddr,
    PrivateBetFactoryAbi,
    wallet
  );

  const bonderRouterContract = new ethers.Contract(
    BonderV1RouterAddr,
    RouterAbi,
    wallet
  );

  try {
    // console.log("Create bet...");
    // const tx1 = await betFactoryContract.createBet(
    //     "Will BonderMarket Win?",
    //     1724142674,
    //     // {
    //     // gasLimit: ethers.utils.hexlify(1000000)
    //     // }
    // );
    // await tx1.wait();
    // console.log("Bet created");

    // console.log("Buy Yes...");

    // const tx2a = await baseUSDCContract.approve(
    //   BonderV1BetFactoryAddr,
    //   ethers.BigNumber.from("100000000000000000000")
    // );

    // await tx2a.wait();
    // console.log("Approve $100");

    // // const buy100Yes = ethers.utils.parseUnits("100")
    // const tx2b = await betFactoryContract.buyYes(
    //   1,
    //   ethers.BigNumber.from("100000000000000000000")
    //   // BigInt(100_000_000_000_000_000_000)
    // );
    // await tx2b.wait();
    // console.log("Bought $100 of Yes");


    // console.log("Buy No...");

    // const tx3a = await baseUSDCContract.approve(
    //     BonderV1BetFactoryAddr,
    //     ethers.BigNumber.from("200000000000000000000")
    // );
        
    // await tx3a.wait();
    // console.log("Approve $200");
        
    // const tx3b = await betFactoryContract.buyNo(
    //     1,
    //     ethers.BigNumber.from("200000000000000000000")
    // );
    // await tx3b.wait();
    // console.log("Deposited $200 to Yes");

    // console.log("Deposit to Yes LP");
    
    const betStruct = await betFactoryContract.getBetStruct(1);
    // console.log(betStruct)
    const yesTokenAddr = betStruct[12];
    console.log(yesTokenAddr)

    const BetTokenERC20Yes = new ethers.Contract(
      yesTokenAddr,
      BetTokenERC20Abi,
      wallet
    );

    // const tx4a = await baseUSDCContract.approve(
    //   BonderV1RouterAddr,
    //   ethers.BigNumber.from("1000000000000000000000")
    //   );
    //   await tx4a.wait();
    //   console.log("Approve $1000 from baseUSDC");
      
    //   const tx4b = await BetTokenERC20Yes.approve(
    //       BonderV1RouterAddr,
    //       ethers.BigNumber.from("1000000000000000000000")
    // );
    // await tx4b.wait();
    // console.log("Approve $1000 from betTokenYes");

    // // const deposit100 = ethers.utils.parseUnits(100);
    // const tx4c = await bonderRouterContract.addLiquidity(
    //   yesTokenAddr,
    //   BonderBaseSepoliaUSDCAddr,
    //   ethers.BigNumber.from("100000000000000000000"),
    //   ethers.BigNumber.from("100000000000000000000"),
    //   0,
    //   0,
    //   wallet.address,
    //   1724142674
    // );

    // await tx4c.wait();
    // console.log("Added $100 and 100 Yes Tokens to LP");
  
    console.log("Check how many tokens user have")
    
    const yesBalance = await BetTokenERC20Yes.balanceOf(wallet.address)
    const yesBalanceValue = ethers.utils.formatUnits(yesBalance);;
    console.log("Yes Tokens:", yesBalanceValue)
    
    const lpPair = await pairLpFactoryContract.getPair(yesTokenAddr,BonderBaseSepoliaUSDCAddr)
    console.log("lpPair", lpPair)
    const pairContract = new ethers.Contract(lpPair, BonderV1PairJsonAbi, wallet);
    const pairBalance = await pairContract.balanceOf(wallet.address)
    const pairBalanceValue = ethers.utils.formatUnits(pairBalance);;

    console.log("LP Tokens:", pairBalanceValue)
    


} catch (error) {
    console.log(error);
  }
}

runFunctions();
