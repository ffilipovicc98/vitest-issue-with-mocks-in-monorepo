import { writeContract } from "wagmi/actions";
import { Address, erc20Abi, parseEther } from "viem";
import { wagmiConfig } from "wallet-connection";

const approve = async ({
  tokenAddress,
  spenderAddress,
  amount,
}: {
  tokenAddress: Address;
  spenderAddress: Address;
  amount: number;
}) => {
  const amountWei = parseEther(`${amount}`);

  const txHash = await writeContract(wagmiConfig, {
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spenderAddress, amountWei],
  });

  return { txHash };
};

export { approve };
