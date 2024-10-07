import { ethers, ContractFactory } from "ethers";


import * as BonderBaseSepoliaUSDC from "../out/BonderBaseSepoliaUSDC.sol/BonderBaseSepoliaUSDC.json" assert { type: "json" };
import * as BonderPoolJson from "../out/BonderPool.sol/BonderPool.json" assert { type: "json" };
import * as BonderV1PairLPFactoryJson from "../out/BonderV1PairLPFactory.sol/BonderV1PairLPFactory.json" assert { type: "json" };
import * as BonderV1BetFactoryJson from "../out/BonderV1BetFactory.sol/BonderV1BetFactory.json" assert { type: "json" };
import * as BonderV1PrivateBetFactoryJson from "../out/BonderV1PrivateBetFactory.sol/BonderV1PrivateBetFactory.json" assert { type: "json" };
import * as BonderV1RouterJson from "../out/BonderV1Router.sol/BonderV1Router.json" assert { type: "json" };
import * as BetTokenERC20Json from "../out/BetTokenERC20.sol/BetTokenERC20.json" assert { type: "json" };
import * as BonderV1PairJson from "../out/BonderV1Pair.sol/BonderV1Pair.json" assert { type: "json" };

const quickNodeApiKey = '94385d832c1bcfc26698cb7a359b3c7f18bf2db2'

// TODO: Update addresses if need be

export const BonderBaseSepoliaUSDCAddr = '0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc';
export const BonderPoolAddr = '0x15e61e0Fa5f11Fa6cB152999F37691e045B8aFB0';
export const BonderV1PairLPFactoryAddr = '0xdCbDD8780D72798bd139a7b02809C1a1270AfEA1';
export const BonderV1BetFactoryAddr = '0x625b90b075604FddeD16FF788ee9AF7a914eD543';
export const BonderV1PrivateBetFactoryAddr = '0x564C4FBea4a79c438a762208Df59315FA521e9d6';
export const BonderV1RouterAddr = '0x4B408CB41B0e13F80D71D3fd163C8cC68B550d4e';


export const BonderBaseSepoliaUSDCAbi = BonderBaseSepoliaUSDC.default.abi;
export const BonderBaseSepoliaUSDCByteCode = BonderBaseSepoliaUSDC.default.bytecode;

export const BonderPoolAbi = BonderPoolJson.default.abi;
export const BonderPoolByteCode = BonderPoolJson.default.bytecode;

export const PairLPFactoryAbi = BonderV1PairLPFactoryJson.default.abi;
export const PairLPFactoryByteCode = BonderV1PairLPFactoryJson.default.bytecode;

export const BetFactoryAbi = BonderV1BetFactoryJson.default.abi;
export const BetFactoryByteCode = BonderV1BetFactoryJson.default.bytecode;

export const PrivateBetFactoryAbi = BonderV1PrivateBetFactoryJson.default.abi;
export const PrivateBetFactoryJsonByteCode = BonderV1PrivateBetFactoryJson.default.bytecode;

export const RouterAbi = BonderV1RouterJson.default.abi;
export const RouterByteCode = BonderV1RouterJson.default.bytecode;

export const BetTokenERC20Abi = BetTokenERC20Json.default.abi;
export const BetTokenERC20ByteCode = BetTokenERC20Json.default.bytecode;

export const BonderV1PairJsonAbi = BonderV1PairJson.default.abi;
export const BonderV1PairJsonByteCode = BonderV1PairJson.default.bytecode;




export const BaseSepoliaQuiknodeProvider = new ethers.providers.JsonRpcProvider(
  `https://attentive-wandering-dust.base-sepolia.quiknode.pro/${quickNodeApiKey}`
);