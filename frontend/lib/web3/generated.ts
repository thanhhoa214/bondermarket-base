import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderBaseUSDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderBaseUsdcAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  { type: 'error', inputs: [{ name: 'sender', internalType: 'address', type: 'address' }], name: 'ERC20InvalidSender' },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
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
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
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
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
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
] as const;

export const bonderBaseUsdcAddress = '0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc' as const;

export const bonderBaseUsdcConfig = { address: bonderBaseUsdcAddress, abi: bonderBaseUsdcAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderPoolAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_baseUSDCAddr', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  { type: 'error', inputs: [{ name: 'sender', internalType: 'address', type: 'address' }], name: 'ERC20InvalidSender' },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
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
      { name: 'bonder', internalType: 'address', type: 'address', indexed: true },
      { name: 'depositAmount', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DepositPool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'bonder', internalType: 'address', type: 'address', indexed: true },
      { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'WithdrawPool',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
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
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'bondPoolAmt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bondPoolLimit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'bonderLastDepositTime',
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
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositBondPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'factoryBurn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'factoryMint',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '_betFactoryAddr', internalType: 'address', type: 'address' },
      { name: '_isPool', internalType: 'bool', type: 'bool' },
    ],
    name: 'setBetFactory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bondPoolLimit', internalType: 'uint256', type: 'uint256' }],
    name: 'setBondPoolLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_timeLock', internalType: 'uint256', type: 'uint256' }],
    name: 'setTimeLock',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'timeLock',
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
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_lpAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawBondPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const bonderPoolAddress = '0x15e61e0Fa5f11Fa6cB152999F37691e045B8aFB0' as const;

export const bonderPoolConfig = { address: bonderPoolAddress, abi: bonderPoolAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1BetFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1BetFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_baseUSDCAddr', internalType: 'address', type: 'address' },
      { name: '_bonderPoolAddr', internalType: 'address', type: 'address' },
      { name: '_lpFactoryAddr', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'creator', internalType: 'address', type: 'address', indexed: true },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bonder', internalType: 'address', type: 'address', indexed: true },
      { name: 'lpAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BondNo',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bonder', internalType: 'address', type: 'address', indexed: true },
      { name: 'lpAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BondYes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'betAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BuyNo',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'betAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BuyYes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'result', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'winningClaim', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'finalDecision', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'FinalDecision',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'time', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'NewSettings',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'oldStage', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8', indexed: false },
      { name: 'newStage', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'StageChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bonder', internalType: 'address', type: 'address', indexed: true },
      { name: 'result', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'bondCount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'bondReward', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Unbond',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'betId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'betSettings',
    outputs: [
      { name: 'treasuryAddr', internalType: 'address', type: 'address' },
      { name: 'treasuryFee', internalType: 'uint256', type: 'uint256' },
      { name: 'poolFee', internalType: 'uint256', type: 'uint256' },
      { name: 'creatorFee', internalType: 'uint256', type: 'uint256' },
      { name: 'disputeThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'validateDuration', internalType: 'uint256', type: 'uint256' },
      { name: 'disputeDuration', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_lpAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bondNo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_lpAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bondYes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'bonderNoBonds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'bonderYesBonds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'changeFromBet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'changeFromValidate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betDescription', internalType: 'string', type: 'string' },
      { name: '_expiryTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createBet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBetSettings',
    outputs: [
      { name: 'treasuryAddr', internalType: 'address', type: 'address' },
      { name: 'treasuryFee', internalType: 'uint256', type: 'uint256' },
      { name: 'poolFee', internalType: 'uint256', type: 'uint256' },
      { name: 'creatorFee', internalType: 'uint256', type: 'uint256' },
      { name: 'disputeThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'validateDuration', internalType: 'uint256', type: 'uint256' },
      { name: 'disputeDuration', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBetStruct',
    outputs: [
      {
        name: 'betStruct',
        internalType: 'struct BonderV1BetFactory.Bet',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'betDescription', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'expiryTime', internalType: 'uint256', type: 'uint256' },
          { name: 'stage', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8' },
          { name: 'result', internalType: 'uint256', type: 'uint256' },
          { name: 'disputed', internalType: 'bool', type: 'bool' },
          { name: 'bonderFee', internalType: 'uint256', type: 'uint256' },
          { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
          { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
          { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'yesToken', internalType: 'address', type: 'address' },
          { name: 'noToken', internalType: 'address', type: 'address' },
          { name: 'yesLp', internalType: 'address', type: 'address' },
          { name: 'noLp', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_bonder', internalType: 'address', type: 'address' },
    ],
    name: 'getBonderNoBonds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_bonder', internalType: 'address', type: 'address' },
    ],
    name: 'getBonderYesBonds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDisputeThresholdAmt',
    outputs: [{ name: 'disputeThresholdAmt', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getEnumValue',
    outputs: [{ name: '', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToBet',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'betDescription', internalType: 'string', type: 'string' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'expiryTime', internalType: 'uint256', type: 'uint256' },
      { name: 'stage', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8' },
      { name: 'result', internalType: 'uint256', type: 'uint256' },
      { name: 'disputed', internalType: 'bool', type: 'bool' },
      { name: 'bonderFee', internalType: 'uint256', type: 'uint256' },
      { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
      { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
      { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'yesToken', internalType: 'address', type: 'address' },
      { name: 'noToken', internalType: 'address', type: 'address' },
      { name: 'yesLp', internalType: 'address', type: 'address' },
      { name: 'noLp', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '_treasuryAddr', internalType: 'address', type: 'address' },
      { name: '_treasuryFee', internalType: 'uint256', type: 'uint256' },
      { name: '_poolFee', internalType: 'uint256', type: 'uint256' },
      { name: '_creatorFee', internalType: 'uint256', type: 'uint256' },
      { name: '_disputeThreshold', internalType: 'uint256', type: 'uint256' },
      { name: '_validateDuration', internalType: 'uint256', type: 'uint256' },
      { name: '_disputeDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBetSettings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_decision', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setFinalDecision',
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
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'unbond',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const bonderV1BetFactoryAddress = '0x625b90b075604FddeD16FF788ee9AF7a914eD543' as const;

export const bonderV1BetFactoryConfig = { address: bonderV1BetFactoryAddress, abi: bonderV1BetFactoryAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1Pair
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1PairAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
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
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount0', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount1', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount0', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount1', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount0In', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount1In', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount0Out', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount1Out', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'reserve0', internalType: 'uint112', type: 'uint112', indexed: false },
      { name: 'reserve1', internalType: 'uint112', type: 'uint112', indexed: false },
    ],
    name: 'Sync',
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
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
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
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
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
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '_reserve0', internalType: 'uint112', type: 'uint112' },
      { name: '_reserve1', internalType: 'uint112', type: 'uint112' },
      { name: '_blockTimestampLast', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token0', internalType: 'address', type: 'address' },
      { name: '_token1', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'kLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: 'liquidity', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'skim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Out', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Out', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'sync', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
] as const;

export const bonderV1PairAddress = '0x0000000000000000000000000000000000000000' as const;

export const bonderV1PairConfig = { address: bonderV1PairAddress, abi: bonderV1PairAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1PairLPFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1PairLpFactoryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenB', internalType: 'address', type: 'address', indexed: true },
      { name: 'pair', internalType: 'address', type: 'address', indexed: false },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'PairCreated',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'allPairs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'allPairsLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'createPair',
    outputs: [{ name: 'pair', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeTo',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeToSetter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '_betFactoryAddr', internalType: 'address', type: 'address' },
      { name: '_isPool', internalType: 'bool', type: 'bool' },
    ],
    name: 'setBetFactory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_feeTo', internalType: 'address', type: 'address' }],
    name: 'setFeeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_feeToSetter', internalType: 'address', type: 'address' }],
    name: 'setFeeToSetter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const bonderV1PairLpFactoryAddress = '0xdCbDD8780D72798bd139a7b02809C1a1270AfEA1' as const;

export const bonderV1PairLpFactoryConfig = {
  address: bonderV1PairLpFactoryAddress,
  abi: bonderV1PairLpFactoryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1PrivateBetFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1PrivateBetFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_baseUSDCAddr', internalType: 'address', type: 'address' },
      { name: '_bonderTokenAddr', internalType: 'address', type: 'address' },
      { name: '_lpFactoryAddr', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'creator', internalType: 'address', type: 'address', indexed: true },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetEnd',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'betAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BuyNo',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'betAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BuyYes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'betId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'bettor', internalType: 'address', type: 'address', indexed: true },
      { name: 'result', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'winningClaim', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'time', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'time', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'NewSettings',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'betSettings',
    outputs: [
      { name: 'treasuryAddr', internalType: 'address', type: 'address' },
      { name: 'treasuryFee', internalType: 'uint256', type: 'uint256' },
      { name: 'poolFee', internalType: 'uint256', type: 'uint256' },
      { name: 'creatorFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
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
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betDescription', internalType: 'string', type: 'string' },
      { name: '_expiryTime', internalType: 'uint256', type: 'uint256' },
      { name: '_creatorFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPrivateBet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_betId', internalType: 'uint256', type: 'uint256' },
      { name: '_result', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'endPrivateBet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBetStruct',
    outputs: [
      {
        name: 'betStruct',
        internalType: 'struct BonderV1PrivateBetFactory.PrivateBet',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'betDescription', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'expiryTime', internalType: 'uint256', type: 'uint256' },
          { name: 'stage', internalType: 'enum BonderV1PrivateBetFactory.Stages', type: 'uint8' },
          { name: 'result', internalType: 'uint256', type: 'uint256' },
          { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
          { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
          { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
          { name: 'yesToken', internalType: 'address', type: 'address' },
          { name: 'noToken', internalType: 'address', type: 'address' },
          { name: 'yesLp', internalType: 'address', type: 'address' },
          { name: 'noLp', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_betId', internalType: 'uint256', type: 'uint256' }],
    name: 'getEnumValue',
    outputs: [{ name: '', internalType: 'enum BonderV1PrivateBetFactory.Stages', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToBet',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'betDescription', internalType: 'string', type: 'string' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'expiryTime', internalType: 'uint256', type: 'uint256' },
      { name: 'stage', internalType: 'enum BonderV1PrivateBetFactory.Stages', type: 'uint8' },
      { name: 'result', internalType: 'uint256', type: 'uint256' },
      { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
      { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
      { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
      { name: 'yesToken', internalType: 'address', type: 'address' },
      { name: 'noToken', internalType: 'address', type: 'address' },
      { name: 'yesLp', internalType: 'address', type: 'address' },
      { name: 'noLp', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'privateBetId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: '_treasuryAddr', internalType: 'address', type: 'address' },
      { name: '_treasuryFee', internalType: 'uint256', type: 'uint256' },
      { name: '_poolFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBetSettings',
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
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const bonderV1PrivateBetFactoryAddress = '0x564C4FBea4a79c438a762208Df59315FA521e9d6' as const;

export const bonderV1PrivateBetFactoryConfig = {
  address: bonderV1PrivateBetFactoryAddress,
  abi: bonderV1PrivateBetFactoryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonderV1Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonderV1RouterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_pairLpfactory', internalType: 'address', type: 'address' },
      { name: '_baseUSDCAddr', internalType: 'address', type: 'address' },
      { name: '_swapFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
      { name: 'amountADesired', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBDesired', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [
      { name: 'amountA', internalType: 'uint256', type: 'uint256' },
      { name: 'amountB', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeLiquidity',
    outputs: [
      { name: 'amountA', internalType: 'uint256', type: 'uint256' },
      { name: 'amountB', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: '_swapFee', internalType: 'uint256', type: 'uint256' }],
    name: 'setSwapFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'amountOutMin', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountInMax', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapTokensForExactTokens',
    outputs: [{ name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const bonderV1RouterAddress = '0x4B408CB41B0e13F80D71D3fd163C8cC68B550d4e' as const;

export const bonderV1RouterConfig = { address: bonderV1RouterAddress, abi: bonderV1RouterAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__
 */
export const useReadBonderBaseUsdc = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadBonderBaseUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBonderBaseUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadBonderBaseUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"name"`
 */
export const useReadBonderBaseUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBonderBaseUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBonderBaseUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__
 */
export const useWriteBonderBaseUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBonderBaseUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteBonderBaseUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBonderBaseUsdcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__
 */
export const useSimulateBonderBaseUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBonderBaseUsdcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateBonderBaseUsdcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBonderBaseUsdcTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderBaseUsdcAbi}__
 */
export const useWatchBonderBaseUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBonderBaseUsdcApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderBaseUsdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBonderBaseUsdcTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderBaseUsdcAbi,
  address: bonderBaseUsdcAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__
 */
export const useReadBonderPool = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadBonderPoolAllowance = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBonderPoolBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"betFactoryList"`
 */
export const useReadBonderPoolBetFactoryList = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'betFactoryList',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"bondPoolAmt"`
 */
export const useReadBonderPoolBondPoolAmt = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'bondPoolAmt',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"bondPoolLimit"`
 */
export const useReadBonderPoolBondPoolLimit = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'bondPoolLimit',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"bonderLastDepositTime"`
 */
export const useReadBonderPoolBonderLastDepositTime = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'bonderLastDepositTime',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadBonderPoolDecimals = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"name"`
 */
export const useReadBonderPoolName = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBonderPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBonderPoolSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"timeLock"`
 */
export const useReadBonderPoolTimeLock = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'timeLock',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBonderPoolTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__
 */
export const useWriteBonderPool = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBonderPoolApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"depositBondPool"`
 */
export const useWriteBonderPoolDepositBondPool = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'depositBondPool',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"factoryBurn"`
 */
export const useWriteBonderPoolFactoryBurn = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'factoryBurn',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"factoryMint"`
 */
export const useWriteBonderPoolFactoryMint = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'factoryMint',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBonderPoolRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useWriteBonderPoolSetBetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setBetFactory',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setBondPoolLimit"`
 */
export const useWriteBonderPoolSetBondPoolLimit = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setBondPoolLimit',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setTimeLock"`
 */
export const useWriteBonderPoolSetTimeLock = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setTimeLock',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteBonderPoolTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBonderPoolTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBonderPoolTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"withdrawBondPool"`
 */
export const useWriteBonderPoolWithdrawBondPool = /*#__PURE__*/ createUseWriteContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'withdrawBondPool',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__
 */
export const useSimulateBonderPool = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBonderPoolApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"depositBondPool"`
 */
export const useSimulateBonderPoolDepositBondPool = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'depositBondPool',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"factoryBurn"`
 */
export const useSimulateBonderPoolFactoryBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'factoryBurn',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"factoryMint"`
 */
export const useSimulateBonderPoolFactoryMint = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'factoryMint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBonderPoolRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useSimulateBonderPoolSetBetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setBetFactory',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setBondPoolLimit"`
 */
export const useSimulateBonderPoolSetBondPoolLimit = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setBondPoolLimit',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"setTimeLock"`
 */
export const useSimulateBonderPoolSetTimeLock = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'setTimeLock',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateBonderPoolTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBonderPoolTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBonderPoolTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderPoolAbi}__ and `functionName` set to `"withdrawBondPool"`
 */
export const useSimulateBonderPoolWithdrawBondPool = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  functionName: 'withdrawBondPool',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__
 */
export const useWatchBonderPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBonderPoolApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__ and `eventName` set to `"DepositPool"`
 */
export const useWatchBonderPoolDepositPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  eventName: 'DepositPool',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBonderPoolOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBonderPoolTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderPoolAbi}__ and `eventName` set to `"WithdrawPool"`
 */
export const useWatchBonderPoolWithdrawPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderPoolAbi,
  address: bonderPoolAddress,
  eventName: 'WithdrawPool',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__
 */
export const useReadBonderV1BetFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"betId"`
 */
export const useReadBonderV1BetFactoryBetId = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'betId',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"betSettings"`
 */
export const useReadBonderV1BetFactoryBetSettings = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'betSettings',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bonderNoBonds"`
 */
export const useReadBonderV1BetFactoryBonderNoBonds = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bonderNoBonds',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bonderYesBonds"`
 */
export const useReadBonderV1BetFactoryBonderYesBonds = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bonderYesBonds',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getBetSettings"`
 */
export const useReadBonderV1BetFactoryGetBetSettings = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getBetSettings',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getBetStruct"`
 */
export const useReadBonderV1BetFactoryGetBetStruct = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getBetStruct',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getBonderNoBonds"`
 */
export const useReadBonderV1BetFactoryGetBonderNoBonds = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getBonderNoBonds',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getBonderYesBonds"`
 */
export const useReadBonderV1BetFactoryGetBonderYesBonds = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getBonderYesBonds',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getDisputeThresholdAmt"`
 */
export const useReadBonderV1BetFactoryGetDisputeThresholdAmt = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getDisputeThresholdAmt',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"getEnumValue"`
 */
export const useReadBonderV1BetFactoryGetEnumValue = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'getEnumValue',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"idToBet"`
 */
export const useReadBonderV1BetFactoryIdToBet = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'idToBet',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBonderV1BetFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"paused"`
 */
export const useReadBonderV1BetFactoryPaused = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__
 */
export const useWriteBonderV1BetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bondNo"`
 */
export const useWriteBonderV1BetFactoryBondNo = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bondNo',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bondYes"`
 */
export const useWriteBonderV1BetFactoryBondYes = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bondYes',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useWriteBonderV1BetFactoryBuyNo = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'buyNo',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useWriteBonderV1BetFactoryBuyYes = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'buyYes',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"changeFromBet"`
 */
export const useWriteBonderV1BetFactoryChangeFromBet = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'changeFromBet',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"changeFromValidate"`
 */
export const useWriteBonderV1BetFactoryChangeFromValidate = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'changeFromValidate',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteBonderV1BetFactoryClaim = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"createBet"`
 */
export const useWriteBonderV1BetFactoryCreateBet = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'createBet',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBonderV1BetFactoryRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setBetSettings"`
 */
export const useWriteBonderV1BetFactorySetBetSettings = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setBetSettings',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setFinalDecision"`
 */
export const useWriteBonderV1BetFactorySetFinalDecision = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setFinalDecision',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useWriteBonderV1BetFactorySetPause = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setPause',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBonderV1BetFactoryTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"unbond"`
 */
export const useWriteBonderV1BetFactoryUnbond = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'unbond',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__
 */
export const useSimulateBonderV1BetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bondNo"`
 */
export const useSimulateBonderV1BetFactoryBondNo = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bondNo',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"bondYes"`
 */
export const useSimulateBonderV1BetFactoryBondYes = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'bondYes',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useSimulateBonderV1BetFactoryBuyNo = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'buyNo',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useSimulateBonderV1BetFactoryBuyYes = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'buyYes',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"changeFromBet"`
 */
export const useSimulateBonderV1BetFactoryChangeFromBet = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'changeFromBet',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"changeFromValidate"`
 */
export const useSimulateBonderV1BetFactoryChangeFromValidate = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'changeFromValidate',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateBonderV1BetFactoryClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"createBet"`
 */
export const useSimulateBonderV1BetFactoryCreateBet = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'createBet',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBonderV1BetFactoryRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setBetSettings"`
 */
export const useSimulateBonderV1BetFactorySetBetSettings = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setBetSettings',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setFinalDecision"`
 */
export const useSimulateBonderV1BetFactorySetFinalDecision = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setFinalDecision',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useSimulateBonderV1BetFactorySetPause = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'setPause',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBonderV1BetFactoryTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `functionName` set to `"unbond"`
 */
export const useSimulateBonderV1BetFactoryUnbond = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  functionName: 'unbond',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__
 */
export const useWatchBonderV1BetFactoryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"BetCreated"`
 */
export const useWatchBonderV1BetFactoryBetCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'BetCreated',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"BondNo"`
 */
export const useWatchBonderV1BetFactoryBondNoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'BondNo',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"BondYes"`
 */
export const useWatchBonderV1BetFactoryBondYesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'BondYes',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"BuyNo"`
 */
export const useWatchBonderV1BetFactoryBuyNoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'BuyNo',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"BuyYes"`
 */
export const useWatchBonderV1BetFactoryBuyYesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'BuyYes',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchBonderV1BetFactoryClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'Claim',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"FinalDecision"`
 */
export const useWatchBonderV1BetFactoryFinalDecisionEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'FinalDecision',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"NewSettings"`
 */
export const useWatchBonderV1BetFactoryNewSettingsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'NewSettings',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBonderV1BetFactoryOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchBonderV1BetFactoryPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'Paused',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"StageChange"`
 */
export const useWatchBonderV1BetFactoryStageChangeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'StageChange',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"Unbond"`
 */
export const useWatchBonderV1BetFactoryUnbondEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'Unbond',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1BetFactoryAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchBonderV1BetFactoryUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1BetFactoryAbi,
  address: bonderV1BetFactoryAddress,
  eventName: 'Unpaused',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__
 */
export const useReadBonderV1Pair = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadBonderV1PairDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'DOMAIN_SEPARATOR',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`
 */
export const useReadBonderV1PairMinimumLiquidity = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'MINIMUM_LIQUIDITY',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadBonderV1PairPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'PERMIT_TYPEHASH',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadBonderV1PairAllowance = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBonderV1PairBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadBonderV1PairDecimals = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"factory"`
 */
export const useReadBonderV1PairFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'factory',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadBonderV1PairGetReserves = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'getReserves',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"kLast"`
 */
export const useReadBonderV1PairKLast = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'kLast',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"name"`
 */
export const useReadBonderV1PairName = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadBonderV1PairNonces = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'nonces',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"price0CumulativeLast"`
 */
export const useReadBonderV1PairPrice0CumulativeLast = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'price0CumulativeLast',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"price1CumulativeLast"`
 */
export const useReadBonderV1PairPrice1CumulativeLast = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'price1CumulativeLast',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBonderV1PairSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"token0"`
 */
export const useReadBonderV1PairToken0 = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'token0',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"token1"`
 */
export const useReadBonderV1PairToken1 = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'token1',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBonderV1PairTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__
 */
export const useWriteBonderV1Pair = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBonderV1PairApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteBonderV1PairBurn = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'burn',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteBonderV1PairInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteBonderV1PairMint = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteBonderV1PairPermit = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'permit',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"skim"`
 */
export const useWriteBonderV1PairSkim = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'skim',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteBonderV1PairSwap = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'swap',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"sync"`
 */
export const useWriteBonderV1PairSync = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'sync',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteBonderV1PairTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBonderV1PairTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__
 */
export const useSimulateBonderV1Pair = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBonderV1PairApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateBonderV1PairBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'burn',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateBonderV1PairInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateBonderV1PairMint = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateBonderV1PairPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'permit',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"skim"`
 */
export const useSimulateBonderV1PairSkim = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'skim',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateBonderV1PairSwap = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'swap',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"sync"`
 */
export const useSimulateBonderV1PairSync = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'sync',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateBonderV1PairTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBonderV1PairTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__
 */
export const useWatchBonderV1PairEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBonderV1PairApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchBonderV1PairBurnEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Burn',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchBonderV1PairMintEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Mint',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchBonderV1PairSwapEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Swap',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Sync"`
 */
export const useWatchBonderV1PairSyncEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Sync',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBonderV1PairTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairAbi,
  address: bonderV1PairAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__
 */
export const useReadBonderV1PairLpFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"allPairs"`
 */
export const useReadBonderV1PairLpFactoryAllPairs = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'allPairs',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"allPairsLength"`
 */
export const useReadBonderV1PairLpFactoryAllPairsLength = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'allPairsLength',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"betFactoryList"`
 */
export const useReadBonderV1PairLpFactoryBetFactoryList = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'betFactoryList',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"feeTo"`
 */
export const useReadBonderV1PairLpFactoryFeeTo = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'feeTo',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"feeToSetter"`
 */
export const useReadBonderV1PairLpFactoryFeeToSetter = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'feeToSetter',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"getPair"`
 */
export const useReadBonderV1PairLpFactoryGetPair = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'getPair',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBonderV1PairLpFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__
 */
export const useWriteBonderV1PairLpFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const useWriteBonderV1PairLpFactoryCreatePair = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'createPair',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBonderV1PairLpFactoryRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useWriteBonderV1PairLpFactorySetBetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setBetFactory',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setFeeTo"`
 */
export const useWriteBonderV1PairLpFactorySetFeeTo = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setFeeTo',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useWriteBonderV1PairLpFactorySetFeeToSetter = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setFeeToSetter',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBonderV1PairLpFactoryTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__
 */
export const useSimulateBonderV1PairLpFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const useSimulateBonderV1PairLpFactoryCreatePair = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'createPair',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBonderV1PairLpFactoryRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setBetFactory"`
 */
export const useSimulateBonderV1PairLpFactorySetBetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setBetFactory',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setFeeTo"`
 */
export const useSimulateBonderV1PairLpFactorySetFeeTo = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setFeeTo',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useSimulateBonderV1PairLpFactorySetFeeToSetter = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'setFeeToSetter',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBonderV1PairLpFactoryTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__
 */
export const useWatchBonderV1PairLpFactoryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBonderV1PairLpFactoryOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PairLpFactoryAbi}__ and `eventName` set to `"PairCreated"`
 */
export const useWatchBonderV1PairLpFactoryPairCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PairLpFactoryAbi,
  address: bonderV1PairLpFactoryAddress,
  eventName: 'PairCreated',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__
 */
export const useReadBonderV1PrivateBetFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"betSettings"`
 */
export const useReadBonderV1PrivateBetFactoryBetSettings = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'betSettings',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"getBetStruct"`
 */
export const useReadBonderV1PrivateBetFactoryGetBetStruct = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'getBetStruct',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"getEnumValue"`
 */
export const useReadBonderV1PrivateBetFactoryGetEnumValue = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'getEnumValue',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"idToBet"`
 */
export const useReadBonderV1PrivateBetFactoryIdToBet = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'idToBet',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBonderV1PrivateBetFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"paused"`
 */
export const useReadBonderV1PrivateBetFactoryPaused = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"privateBetId"`
 */
export const useReadBonderV1PrivateBetFactoryPrivateBetId = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'privateBetId',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__
 */
export const useWriteBonderV1PrivateBetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useWriteBonderV1PrivateBetFactoryBuyNo = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'buyNo',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useWriteBonderV1PrivateBetFactoryBuyYes = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'buyYes',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteBonderV1PrivateBetFactoryClaim = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"createPrivateBet"`
 */
export const useWriteBonderV1PrivateBetFactoryCreatePrivateBet = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'createPrivateBet',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"endPrivateBet"`
 */
export const useWriteBonderV1PrivateBetFactoryEndPrivateBet = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'endPrivateBet',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBonderV1PrivateBetFactoryRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"setBetSettings"`
 */
export const useWriteBonderV1PrivateBetFactorySetBetSettings = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'setBetSettings',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useWriteBonderV1PrivateBetFactorySetPause = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'setPause',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBonderV1PrivateBetFactoryTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__
 */
export const useSimulateBonderV1PrivateBetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"buyNo"`
 */
export const useSimulateBonderV1PrivateBetFactoryBuyNo = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'buyNo',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"buyYes"`
 */
export const useSimulateBonderV1PrivateBetFactoryBuyYes = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'buyYes',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateBonderV1PrivateBetFactoryClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"createPrivateBet"`
 */
export const useSimulateBonderV1PrivateBetFactoryCreatePrivateBet = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'createPrivateBet',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"endPrivateBet"`
 */
export const useSimulateBonderV1PrivateBetFactoryEndPrivateBet = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'endPrivateBet',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBonderV1PrivateBetFactoryRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"setBetSettings"`
 */
export const useSimulateBonderV1PrivateBetFactorySetBetSettings = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'setBetSettings',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"setPause"`
 */
export const useSimulateBonderV1PrivateBetFactorySetPause = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'setPause',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBonderV1PrivateBetFactoryTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__
 */
export const useWatchBonderV1PrivateBetFactoryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"BetCreated"`
 */
export const useWatchBonderV1PrivateBetFactoryBetCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'BetCreated',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"BetEnd"`
 */
export const useWatchBonderV1PrivateBetFactoryBetEndEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'BetEnd',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"BuyNo"`
 */
export const useWatchBonderV1PrivateBetFactoryBuyNoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'BuyNo',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"BuyYes"`
 */
export const useWatchBonderV1PrivateBetFactoryBuyYesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'BuyYes',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchBonderV1PrivateBetFactoryClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'Claim',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"NewSettings"`
 */
export const useWatchBonderV1PrivateBetFactoryNewSettingsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'NewSettings',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBonderV1PrivateBetFactoryOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchBonderV1PrivateBetFactoryPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'Paused',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1PrivateBetFactoryAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchBonderV1PrivateBetFactoryUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1PrivateBetFactoryAbi,
  address: bonderV1PrivateBetFactoryAddress,
  eventName: 'Unpaused',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1RouterAbi}__
 */
export const useReadBonderV1Router = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"factory"`
 */
export const useReadBonderV1RouterFactory = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'factory',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBonderV1RouterOwner = /*#__PURE__*/ createUseReadContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__
 */
export const useWriteBonderV1Router = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteBonderV1RouterAddLiquidity = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'addLiquidity',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteBonderV1RouterRemoveLiquidity = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'removeLiquidity',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBonderV1RouterRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"setSwapFee"`
 */
export const useWriteBonderV1RouterSetSwapFee = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'setSwapFee',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"swapExactTokensForTokens"`
 */
export const useWriteBonderV1RouterSwapExactTokensForTokens = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'swapExactTokensForTokens',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"swapTokensForExactTokens"`
 */
export const useWriteBonderV1RouterSwapTokensForExactTokens = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'swapTokensForExactTokens',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBonderV1RouterTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__
 */
export const useSimulateBonderV1Router = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateBonderV1RouterAddLiquidity = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'addLiquidity',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateBonderV1RouterRemoveLiquidity = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'removeLiquidity',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBonderV1RouterRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"setSwapFee"`
 */
export const useSimulateBonderV1RouterSetSwapFee = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'setSwapFee',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"swapExactTokensForTokens"`
 */
export const useSimulateBonderV1RouterSwapExactTokensForTokens = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'swapExactTokensForTokens',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"swapTokensForExactTokens"`
 */
export const useSimulateBonderV1RouterSwapTokensForExactTokens = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'swapTokensForExactTokens',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBonderV1RouterTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1RouterAbi}__
 */
export const useWatchBonderV1RouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bonderV1RouterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBonderV1RouterOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bonderV1RouterAbi,
  address: bonderV1RouterAddress,
  eventName: 'OwnershipTransferred',
});
