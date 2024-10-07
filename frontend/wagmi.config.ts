import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { Abi } from 'viem';
import * as BonderBaseUSDCJson from '../contract/out/BonderBaseSepoliaUSDC.sol/BonderBaseSepoliaUSDC.json';
import * as BonderPoolJson from '../contract/out/BonderPool.sol/BonderPool.json';
import * as BonderV1BetFactoryJson from '../contract/out/BonderV1BetFactory.sol/BonderV1BetFactory.json';
import * as BonderV1PairJson from '../contract/out/BonderV1Pair.sol/BonderV1Pair.json';
import * as BonderV1PairLPFactoryJson from '../contract/out/BonderV1PairLPFactory.sol/BonderV1PairLPFactory.json';
import * as BonderV1PrivateBetFactoryJson from '../contract/out/BonderV1PrivateBetFactory.sol/BonderV1PrivateBetFactory.json';
import * as BonderV1RouterJson from '../contract/out/BonderV1Router.sol/BonderV1Router.json';

const BonderBaseUSDCAbi = BonderBaseUSDCJson.abi;
const BonderPoolAbi = BonderPoolJson.abi;
const BonderV1PairLPFactoryAbi = BonderV1PairLPFactoryJson.abi;
const BonderV1BetFactoryAbi = BonderV1BetFactoryJson.abi;
const BonderV1PrivateBetFactoryAbi = BonderV1PrivateBetFactoryJson.abi;
const BonderV1RouterAbi = BonderV1RouterJson.abi;
const BonderV1PairJsonAbi = BonderV1PairJson.abi;

export default defineConfig({
  out: 'lib/web3/generated.ts',
  contracts: [
    {
      abi: BonderBaseUSDCAbi as Abi,
      name: 'BonderBaseUSDC',
      address: '0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc',
    },
    {
      abi: BonderPoolAbi as Abi,
      name: 'BonderPool',
      // address: "0xeeCC223d298e9AdD96986B655387bc34b867C020",
      address: '0x15e61e0Fa5f11Fa6cB152999F37691e045B8aFB0',
    },
    {
      abi: BonderV1PairLPFactoryAbi as Abi,
      name: 'BonderV1PairLPFactory',
      // address: "0x166224A4954b2fae250ad6E98fc495FF3e250477",
      address: '0xdCbDD8780D72798bd139a7b02809C1a1270AfEA1',
    },
    {
      abi: BonderV1BetFactoryAbi as Abi,
      name: 'BonderV1BetFactory',
      // address: "0x166224A4954b2fae250ad6E98fc495FF3e250477",
      address: '0x625b90b075604FddeD16FF788ee9AF7a914eD543',
    },
    {
      abi: BonderV1PrivateBetFactoryAbi as Abi,
      name: 'BonderV1PrivateBetFactory',
      address: '0x564C4FBea4a79c438a762208Df59315FA521e9d6',
    },
    {
      abi: BonderV1RouterAbi as Abi,
      name: 'BonderV1Router',
      // address: "0xCF781f8D62Afc9283E181bfdF4084EBC466bFC18",
      address: '0x4B408CB41B0e13F80D71D3fd163C8cC68B550d4e',
    },
    {
      abi: BonderV1PairJsonAbi as Abi,
      name: 'BonderV1Pair',
      // address: "unknown",
      address: '0x0000000000000000000000000000000000000000',
    },
  ],
  plugins: [react()],
});
