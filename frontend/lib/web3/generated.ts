import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderUSDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderUsdcAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
] as const

export const bonderUsdcAddress = '0x8F516067EE3A3204B85d5bB601aA2a5FC8361c1f' as const

export const bonderUsdcConfig = { address: bonderUsdcAddress, abi: bonderUsdcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1CreatorNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1CreatorNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'minter_', internalType: 'address', type: 'address' },
      { name: 'controller_', internalType: 'address', type: 'address' },
      { name: 'dev_', internalType: 'address', type: 'address' },
      { name: 'feeAddr_', internalType: 'address', type: 'address' },
      { name: 'usdc_', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId_', internalType: 'uint256', type: 'uint256' },
      { name: 'betId_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addBetToCreatorNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'betFactoryList',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'controller',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createBetDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to_', internalType: 'address', type: 'address' }],
    name: 'createMint',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId_', internalType: 'uint256', type: 'uint256' }],
    name: 'creatorFeeCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'creatorProfile',
    outputs: [
      { name: 'feeCap', internalType: 'uint256', type: 'uint256' },
      { name: 'totalBetDeposit', internalType: 'uint256', type: 'uint256' },
      { name: 'completeBetCount', internalType: 'uint256', type: 'uint256' },
      { name: 'nullBetCount', internalType: 'uint256', type: 'uint256' },
      { name: 'rank', internalType: 'uint256', type: 'uint256' },
      { name: 'publicMintNFTFloor', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'creatorToId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'dev',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getCreatorProfile',
    outputs: [
      { name: 'feeCap', internalType: 'uint256', type: 'uint256' },
      { name: 'betIdArray', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalBetDeposit', internalType: 'uint256', type: 'uint256' },
      { name: 'completeBetCount', internalType: 'uint256', type: 'uint256' },
      { name: 'nullBetCount', internalType: 'uint256', type: 'uint256' },
      { name: 'rank', internalType: 'uint256', type: 'uint256' },
      { name: 'publicMintNFTFloor', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToCreator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'baseURI_', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betFactoryAddr_', internalType: 'address', type: 'address' },
      { name: 'allowed_', internalType: 'bool', type: 'bool' },
    ],
    name: 'setBetFactory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'controller_', internalType: 'address', type: 'address' }],
    name: 'setController',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'betDeposit_', internalType: 'uint256', type: 'uint256' }],
    name: 'setCreateBetDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'dev_', internalType: 'address', type: 'address' }],
    name: 'setDev',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'feeAddr_', internalType: 'address', type: 'address' }],
    name: 'setFeeAddr',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'minter_', internalType: 'address', type: 'address' }],
    name: 'setMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenApprovals',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdc',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
] as const

export const bonderV1CreatorNftAddress = '0xA8eAA91c5e176D1Ec1A3Cb712BC216DA92034492' as const

export const bonderV1CreatorNftConfig = { address: bonderV1CreatorNftAddress, abi: bonderV1CreatorNftAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1YesNoFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1YesNoFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_usdcAddr', internalType: 'address', type: 'address' },
      { name: '_creatorNFTAddr', internalType: 'address', type: 'address' },
      { name: '_controller', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyNo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyYes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'controller',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betCid', internalType: 'string', type: 'string' },
      { name: '_cutoffTime', internalType: 'uint256', type: 'uint256' },
      { name: '_creatorFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createBet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'creatorNFT',
    outputs: [{ name: '', internalType: 'contract IBonderV1CreatorNFT', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'creatorNFTAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBetStruct',
    outputs: [
      {
        name: 'betStruct',
        internalType: 'struct BonderV1YesNoFactory.Bet',
        type: 'tuple',
        components: [
          { name: 'betId', internalType: 'uint256', type: 'uint256' },
          { name: 'creatorId', internalType: 'uint256', type: 'uint256' },
          { name: 'betCid', internalType: 'string', type: 'string' },
          { name: 'cutoffTime', internalType: 'uint256', type: 'uint256' },
          { name: 'timeFlag', internalType: 'uint256', type: 'uint256' },
          { name: 'phase', internalType: 'enum BonderV1YesNoFactory.Phase', type: 'uint8' },
          { name: 'result', internalType: 'uint256[3]', type: 'uint256[3]' },
          { name: 'leadOutcome', internalType: 'uint256', type: 'uint256' },
          { name: 'disputeLevel', internalType: 'uint256', type: 'uint256' },
          { name: 'feeToMarketBonders', internalType: 'uint256', type: 'uint256' },
          { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
          { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
          { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'yesToken', internalType: 'address', type: 'address' },
          { name: 'noToken', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getEnumValue',
    outputs: [{ name: '', internalType: 'enum BonderV1YesNoFactory.Phase', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToBet',
    outputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256' },
      { name: 'creatorId', internalType: 'uint256', type: 'uint256' },
      { name: 'betCid', internalType: 'string', type: 'string' },
      { name: 'cutoffTime', internalType: 'uint256', type: 'uint256' },
      { name: 'timeFlag', internalType: 'uint256', type: 'uint256' },
      { name: 'phase', internalType: 'enum BonderV1YesNoFactory.Phase', type: 'uint8' },
      { name: 'leadOutcome', internalType: 'uint256', type: 'uint256' },
      { name: 'disputeLevel', internalType: 'uint256', type: 'uint256' },
      { name: 'feeToMarketBonders', internalType: 'uint256', type: 'uint256' },
      { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
      { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
      { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'yesToken', internalType: 'address', type: 'address' },
      { name: 'noToken', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToFactorySettings',
    outputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256' },
      { name: 'createBetDeposit', internalType: 'uint256', type: 'uint256' },
      { name: 'creatorFee', internalType: 'uint256', type: 'uint256' },
      { name: 'bonderFee', internalType: 'uint256', type: 'uint256' },
      { name: 'pdt', internalType: 'uint256', type: 'uint256' },
      { name: 'bdt', internalType: 'uint256', type: 'uint256' },
      { name: 'vd', internalType: 'uint256', type: 'uint256' },
      { name: 'pdd', internalType: 'uint256', type: 'uint256' },
      { name: 'bdd', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'playerToBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'controller_', internalType: 'address', type: 'address' }],
    name: 'setController',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_setPause', internalType: 'bool', type: 'bool' }],
    name: 'setPause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdc',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdcAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

export const bonderV1YesNoFactoryAddress = '0xACFe5D284FAF59cD0964E7D3F420805B8cD9a310' as const

export const bonderV1YesNoFactoryConfig = {
  address: bonderV1YesNoFactoryAddress,
  abi: bonderV1YesNoFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__
 */
export const useReadBonderUsdc = /*#__PURE__*/ createUseReadContract({ abi: bonderUsdcAbi, address: bonderUsdcAddress })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadBonderUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBonderUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadBonderUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"name"`
 */
export const useReadBonderUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBonderUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"totalMinted"`
 */
export const useReadBonderUsdcTotalMinted = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'totalMinted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBonderUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderUsdcAbi}__
 */
export const useWriteBonderUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBonderUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteBonderUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBonderUsdcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderUsdcAbi}__
 */
export const useSimulateBonderUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBonderUsdcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateBonderUsdcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBonderUsdcTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderUsdcAbi}__
 */
export const useWatchBonderUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderUsdcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBonderUsdcApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderUsdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBonderUsdcTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderUsdcAbi,
  address: bonderUsdcAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__
 */
export const useReadBonderV1CreatorNft = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"baseURI"`
 */
export const useReadBonderV1CreatorNftBaseUri = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'baseURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"betFactoryList"`
 */
export const useReadBonderV1CreatorNftBetFactoryList = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'betFactoryList',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"controller"`
 */
export const useReadBonderV1CreatorNftController = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'controller',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"createBetDeposit"`
 */
export const useReadBonderV1CreatorNftCreateBetDeposit = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'createBetDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"creatorFeeCap"`
 */
export const useReadBonderV1CreatorNftCreatorFeeCap = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'creatorFeeCap',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"creatorProfile"`
 */
export const useReadBonderV1CreatorNftCreatorProfile = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'creatorProfile',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"creatorToId"`
 */
export const useReadBonderV1CreatorNftCreatorToId = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'creatorToId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"dev"`
 */
export const useReadBonderV1CreatorNftDev = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'dev',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"feeAddr"`
 */
export const useReadBonderV1CreatorNftFeeAddr = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'feeAddr',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadBonderV1CreatorNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"getCreatorProfile"`
 */
export const useReadBonderV1CreatorNftGetCreatorProfile = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'getCreatorProfile',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"idToCreator"`
 */
export const useReadBonderV1CreatorNftIdToCreator = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'idToCreator',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"minter"`
 */
export const useReadBonderV1CreatorNftMinter = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'minter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadBonderV1CreatorNftName = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadBonderV1CreatorNftSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBonderV1CreatorNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"tokenApprovals"`
 */
export const useReadBonderV1CreatorNftTokenApprovals = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'tokenApprovals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadBonderV1CreatorNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"totalMinted"`
 */
export const useReadBonderV1CreatorNftTotalMinted = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'totalMinted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBonderV1CreatorNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"usdc"`
 */
export const useReadBonderV1CreatorNftUsdc = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'usdc',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__
 */
export const useWriteBonderV1CreatorNft = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"addBetToCreatorNFT"`
 */
export const useWriteBonderV1CreatorNftAddBetToCreatorNft = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'addBetToCreatorNFT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBonderV1CreatorNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"createMint"`
 */
export const useWriteBonderV1CreatorNftCreateMint = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'createMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteBonderV1CreatorNftSafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteBonderV1CreatorNftSetBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useWriteBonderV1CreatorNftSetBetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setBetFactory',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setController"`
 */
export const useWriteBonderV1CreatorNftSetController = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setController',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setCreateBetDeposit"`
 */
export const useWriteBonderV1CreatorNftSetCreateBetDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setCreateBetDeposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setDev"`
 */
export const useWriteBonderV1CreatorNftSetDev = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setDev',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setFeeAddr"`
 */
export const useWriteBonderV1CreatorNftSetFeeAddr = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setFeeAddr',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setMinter"`
 */
export const useWriteBonderV1CreatorNftSetMinter = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setMinter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBonderV1CreatorNftTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__
 */
export const useSimulateBonderV1CreatorNft = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"addBetToCreatorNFT"`
 */
export const useSimulateBonderV1CreatorNftAddBetToCreatorNft = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'addBetToCreatorNFT',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBonderV1CreatorNftApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"createMint"`
 */
export const useSimulateBonderV1CreatorNftCreateMint = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'createMint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateBonderV1CreatorNftSafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateBonderV1CreatorNftSetBaseUri = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useSimulateBonderV1CreatorNftSetBetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setBetFactory',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setController"`
 */
export const useSimulateBonderV1CreatorNftSetController = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setController',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setCreateBetDeposit"`
 */
export const useSimulateBonderV1CreatorNftSetCreateBetDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setCreateBetDeposit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setDev"`
 */
export const useSimulateBonderV1CreatorNftSetDev = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setDev',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setFeeAddr"`
 */
export const useSimulateBonderV1CreatorNftSetFeeAddr = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setFeeAddr',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"setMinter"`
 */
export const useSimulateBonderV1CreatorNftSetMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'setMinter',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBonderV1CreatorNftTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__
 */
export const useWatchBonderV1CreatorNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBonderV1CreatorNftApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1CreatorNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBonderV1CreatorNftTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1CreatorNftAbi,
  address: bonderV1CreatorNftAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__
 */
export const useReadBonderV1YesNoFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"controller"`
 */
export const useReadBonderV1YesNoFactoryController = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'controller',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"creatorNFT"`
 */
export const useReadBonderV1YesNoFactoryCreatorNft = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'creatorNFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"creatorNFTAddress"`
 */
export const useReadBonderV1YesNoFactoryCreatorNftAddress = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'creatorNFTAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"getBetStruct"`
 */
export const useReadBonderV1YesNoFactoryGetBetStruct = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'getBetStruct',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"getEnumValue"`
 */
export const useReadBonderV1YesNoFactoryGetEnumValue = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'getEnumValue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"idToBet"`
 */
export const useReadBonderV1YesNoFactoryIdToBet = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'idToBet',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"idToFactorySettings"`
 */
export const useReadBonderV1YesNoFactoryIdToFactorySettings = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'idToFactorySettings',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"isPaused"`
 */
export const useReadBonderV1YesNoFactoryIsPaused = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'isPaused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"playerToBets"`
 */
export const useReadBonderV1YesNoFactoryPlayerToBets = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'playerToBets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"totalBets"`
 */
export const useReadBonderV1YesNoFactoryTotalBets = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'totalBets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"usdc"`
 */
export const useReadBonderV1YesNoFactoryUsdc = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'usdc',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"usdcAddress"`
 */
export const useReadBonderV1YesNoFactoryUsdcAddress = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'usdcAddress',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__
 */
export const useWriteBonderV1YesNoFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useWriteBonderV1YesNoFactoryBuyNo = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'buyNo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useWriteBonderV1YesNoFactoryBuyYes = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'buyYes',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"createBet"`
 */
export const useWriteBonderV1YesNoFactoryCreateBet = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'createBet',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"setController"`
 */
export const useWriteBonderV1YesNoFactorySetController = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'setController',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useWriteBonderV1YesNoFactorySetPause = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'setPause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__
 */
export const useSimulateBonderV1YesNoFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useSimulateBonderV1YesNoFactoryBuyNo = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'buyNo',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useSimulateBonderV1YesNoFactoryBuyYes = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'buyYes',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"createBet"`
 */
export const useSimulateBonderV1YesNoFactoryCreateBet = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'createBet',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"setController"`
 */
export const useSimulateBonderV1YesNoFactorySetController = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'setController',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1YesNoFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useSimulateBonderV1YesNoFactorySetPause = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1YesNoFactoryAbi,
  address: bonderV1YesNoFactoryAddress,
  functionName: 'setPause',
})
