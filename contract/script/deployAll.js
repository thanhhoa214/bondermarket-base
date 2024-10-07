import { ethers, ContractFactory } from "ethers";

import { BonderPoolAbi } from "./abi.js"
import { BonderPoolByteCode } from "./abi.js"
import { PairLPFactoryAbi } from "./abi.js"
import { PairLPFactoryByteCode } from "./abi.js"
import { BetFactoryAbi } from "./abi.js"
import { BetFactoryByteCode } from "./abi.js"
import { PrivateBetFactoryAbi } from "./abi.js"
import { PrivateBetFactoryJsonByteCode } from "./abi.js"
import { RouterAbi } from "./abi.js"
import { RouterByteCode } from "./abi.js"
import { BaseSepoliaQuiknodeProvider } from "./abi.js"

// const deployerKey = [ADD PRIVATE KEY];

const BonderBaseSepoliaUSDCAddr = "0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc";


async function deployAll() {
  const wallet = new ethers.Wallet(deployerKey, BaseSepoliaQuiknodeProvider);

  const bonderPoolContractFactory = new ContractFactory(
    BonderPoolAbi,
    BonderPoolByteCode,
    wallet
  );

  const pairLpFactoryContractFactory = new ContractFactory(
    PairLPFactoryAbi,
    PairLPFactoryByteCode,
    wallet
  );

  const betFactoryContractFactory = new ContractFactory(
    BetFactoryAbi,
    BetFactoryByteCode,
    wallet
  );

  const privateBetFactoryContractFactory = new ContractFactory(
    PrivateBetFactoryAbi,
    PrivateBetFactoryJsonByteCode,
    wallet
  );
  const routerContractFactory = new ContractFactory(RouterAbi, RouterByteCode, wallet);

  //   const bonderPoolToken = new ethers.Contract(BonderPoolLPToken, BonderPoolLPTokenAbi, wallet);
  //   const pairLpFactory = new ethers.Contract(BonderV1PairLPFactory, BonderV1PairLPFactoryAbi, wallet);

  try {
    console.log("Deploying Bonder Pool...");
    const deployBonderPool = await bonderPoolContractFactory.deploy(
      BonderBaseSepoliaUSDCAddr
    );
    console.log("deployedAddress:", deployBonderPool.address);
    await deployBonderPool.deployTransaction.wait();
    console.log("Bonder Pool Deployed!");

    console.log("Deploying Pair Lp Factory...");
    const deployPairLpFactory = await pairLpFactoryContractFactory.deploy();
    console.log("deployedAddress:", deployPairLpFactory.address);
    await deployPairLpFactory.deployTransaction.wait();
    console.log("Pair Lp Factory Deployed!");

    console.log("Deploying Bet Factory...");
    const deployBetFactory = await betFactoryContractFactory.deploy(
      BonderBaseSepoliaUSDCAddr,
      deployBonderPool.address,
      deployPairLpFactory.address
    );
    console.log("deployedAddress:", deployBetFactory.address);
    await deployBetFactory.deployTransaction.wait();
    console.log("Bet Factory Deployed!");

    console.log("Deploying Private Bet Factory...");
    const deployPrivateBetFactory = await privateBetFactoryContractFactory.deploy(
      BonderBaseSepoliaUSDCAddr,
      deployBonderPool.address,
      deployPairLpFactory.address
    );
    console.log("deployedAddress:", deployPrivateBetFactory.address);
    await deployPrivateBetFactory.deployTransaction.wait();
    console.log("PrivateBet Factory Deployed!");

    console.log("Deploying Router...");
    const deployRouter = await routerContractFactory.deploy(
      deployPairLpFactory.address,
      BonderBaseSepoliaUSDCAddr,
      100
    );
    console.log("deployedAddress:", deployRouter.address);
    await deployRouter.deployTransaction.wait();
    console.log("Router Deployed!");
    
    


  } catch (error) {
    console.log(error);
  }
  return;
}

deployAll();
