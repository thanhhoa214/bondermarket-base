import { Address, createPublicClient, createWalletClient, http, parseEther, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import env from '../env/private';
import { bonderUsdcConfig } from './generated';

const account = privateKeyToAccount(env.FAUCET_PRIVATE_KEY as Address);

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(env.NEXT_PUBLIC_HTTP_RPC_URL),
});
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(env.NEXT_PUBLIC_HTTP_RPC_URL, { batch: true }),
});

export async function faucetAddress(address: Address) {
  const usdcTxHash = await sendUSDC(address, parseFloat(env.FAUCET_USDC_AMOUNT));
  const ethTxHash = await sendETH(address, parseFloat(env.FAUCET_ETH_AMOUNT));
  return { usdcTxHash, ethTxHash };
}

async function sendUSDC(toAddress: Address, amount: number) {
  const { request } = await publicClient.simulateContract({
    ...bonderUsdcConfig,
    functionName: 'transfer',
    args: [toAddress, parseUnits(amount.toString(), 18)],
    account,
  });

  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

async function sendETH(toAddress: Address, amount: number) {
  const hash = await walletClient.sendTransaction({
    to: toAddress,
    value: parseEther(amount.toString()),
  });
  return hash;
}
