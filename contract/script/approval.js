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

import { BonderBaseSepoliaUSDCAddr } from "./abi.js";
import { BonderPoolAddr } from "./abi.js";
import { BonderV1PairLPFactoryAddr } from "./abi.js";
import { BonderV1BetFactoryAddr } from "./abi.js";
import { BonderV1PrivateBetFactoryAddr } from "./abi.js";
import { BonderV1RouterAddr } from "./abi.js";

// const deployerKey = [ADD PRIVATE KEY];

async function approve() {
  const wallet = new ethers.Wallet(deployerKey, BaseSepoliaQuiknodeProvider);

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

  try {
    console.log("Allow betFactory to call BonderPool...");
    const tx1a = await bonderPoolContract.setBetFactory(
      BonderV1BetFactoryAddr,
      true
    );
    await tx1a.wait();
    console.log("txn mined");

    console.log("Check if betFactory can call BonderPool");
    const tx1b = await bonderPoolContract.betFactoryList(
      BonderV1BetFactoryAddr
    );
    console.log(tx1b);

    console.log("Allow betFactory to call PairLPFactory...");
    const tx2a = await pairLpFactoryContract.setBetFactory(
      BonderV1BetFactoryAddr,
      true
    );
    await tx2a.wait();
    console.log("txn mined");

    console.log("Check if betFactory can call BonderPool");
    const tx2b = await pairLpFactoryContract.betFactoryList(
      BonderV1BetFactoryAddr
    );
    console.log(tx2b);

    console.log("Allow PRIVATE betFactory to call BonderPool...");
    const tx3a = await bonderPoolContract.setBetFactory(
      BonderV1PrivateBetFactoryAddr,
      true
    );
    await tx3a.wait();
    console.log("txn mined");

    console.log("Check if PRIVATE betFactory can call BonderPool...");
    const tx3b = await bonderPoolContract.betFactoryList(
      BonderV1PrivateBetFactoryAddr
    );
    console.log(tx3b);

    console.log("Allow PRIVATE betFactory to call BonderPool...");
    const tx4a = await pairLpFactoryContract.setBetFactory(
      BonderV1PrivateBetFactoryAddr,
      true
    );
    await tx4a.wait();
    console.log("txn mined");

    console.log("Check if PRIVATE betFactory can call BonderPool");
    const tx4b = await pairLpFactoryContract.betFactoryList(
      BonderV1PrivateBetFactoryAddr
    );
    console.log(tx4b);

    console.log("Set Bonder Pool Deposit Limits...");
    const largeNumber = ethers.BigNumber.from("100000000000000000000000"); // String representation of 1e+23

    const tx5 = await bonderPoolContract.setBondPoolLimit(largeNumber);
    await tx5.wait();
    console.log("Limits set!");
    
    console.log("Bet Factory Setting...");
    const tx6 = await betFactoryContract.setBetSettings(
        wallet.address,
        40,
        50,
        10,
        500,
        2400,
        2400
        );
    await tx6.wait();
    console.log("Settings done!");

    console.log("Private Bet Factory Setting...");
    const tx7 = await privateBetFactoryContract.setBetSettings(wallet.address, 40, 200);
    await tx7.wait();
    console.log("Settings done!");
  } catch (error) {
    console.log(error);
  }
  return;
}

approve();
