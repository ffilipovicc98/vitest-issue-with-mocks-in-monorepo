import { writeContract } from "wagmi/actions";
import { config } from "../wagmi";
import { Address, erc20Abi, parseEther } from "viem";

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

  const txHash = await writeContract(config, {
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spenderAddress, amountWei],
  });

  return { txHash };
};

export { approve };
