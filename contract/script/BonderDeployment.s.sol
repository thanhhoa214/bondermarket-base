// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "forge-std/Script.sol";
// import { BonderBaseSepoliaUSDC } from "../src/new/BonderBaseSepoliaUSDC.sol";
// import { BonderPool } from "../src/new/BonderPool.sol";

// import {BonderV1BetFactory} from "src/new/BonderV1BetFactory.sol";
// import {BonderV1PairLibrary} from "src/uniswap/BonderV1PairLibrary.sol";
// import {BonderV1PairLPFactory} from "src/uniswap/BonderV1PairLPFactory.sol";
// import {BonderV1Router} from "src/uniswap/BonderV1Router.sol";

// import { IBonderPool } from "../src/interface/IBonderPool.sol";

// // source .env
// // forge script --chain-id 84532 script/BonderDeployment.s.sol:BonderDeployment --rpc-url $SEPOLIA_RPC_URL --broadcast -vvvv
// contract BonderDeployment is Script {
//   function run() external {

//     uint deployerPrivateKey = vm.envUint("PRIVATE_KEY");

//     vm.startBroadcast(deployerPrivateKey);

//     BonderBaseSepoliaUSDC bonderUSDC = new BonderBaseSepoliaUSDC();
//     address bonderUSDCAddress = address(bonderUSDC);
//     console.log("bonderUSDCAddress:", bonderUSDCAddress);

//     BonderPool bonderPoolToken = new BonderPool();
//     address bonderPoolTokenAddress = address(bonderPoolToken);
//     console.log("bonderPoolTokenAddress:", bonderPoolTokenAddress);

//     BonderV1PairLPFactory pairLpFactory = new BonderV1PairLPFactory();
//     address pairLpFactoryAddress = address(pairLpFactory);
//     console.log("pairLpFactoryAddress:", pairLpFactoryAddress);

//     BonderV1BetFactory betFactory = new BonderV1BetFactory(bonderUSDCAddress, bonderPoolTokenAddress, pairLpFactoryAddress);
//     address betFactoryAddress = address(betFactory);
//     console.log("betFactoryAddress:", betFactoryAddress);

//     IBonderPoolLPToken(bonderPoolTokenAddress).setBondPool(betFactoryAddress, true);
//     BonderV1PairLPFactory(pairLpFactoryAddress).setBondPool(betFactoryAddress, true);


//     vm.stopBroadcast();
//   }
// }
