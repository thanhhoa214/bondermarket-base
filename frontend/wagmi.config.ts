import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { Abi } from 'viem';

import * as BonderUSDCJson from '../contract/out/BonderUSDC.sol/BonderUSDC.json';
import * as BonderV1CreatorNFTJson from '../contract/out/BonderV1CreatorNFT.sol/BonderV1CreatorNFT.json';
import * as BonderV1YesNoFactoryJson from '../contract/out/BonderV1YesNoFactory.sol/BonderV1YesNoFactory.json';

const BonderUSDCAbi = BonderUSDCJson.abi;
const BonderV1CreatorNFTAbi = BonderV1CreatorNFTJson.abi;
const BonderV1YesNoFactoryAbi = BonderV1YesNoFactoryJson.abi;

export default defineConfig({
  out: 'lib/web3/generated.ts',
  contracts: [
    {
      abi: BonderUSDCAbi as Abi,
      name: 'BonderUSDC',
      address: '0x8F516067EE3A3204B85d5bB601aA2a5FC8361c1f',
    },
    {
      abi: BonderV1CreatorNFTAbi as Abi,
      name: 'BonderV1CreatorNFT',
      address: '0xA8eAA91c5e176D1Ec1A3Cb712BC216DA92034492',
    },
    {
      abi: BonderV1YesNoFactoryAbi as Abi,
      name: 'BonderV1YesNoFactory',
      address: '0xACFe5D284FAF59cD0964E7D3F420805B8cD9a310',
    },
  ],
  plugins: [react()],
});
