import { connect } from "wagmi/actions";

import { expect, it, vi } from "vitest";

import { http, zeroAddress } from "viem";
import { approve } from "./approve";
import { createConfig } from "wagmi";
import { avalanche } from "wagmi/chains";
import { mock } from "wagmi/connectors";

const testConfig = createConfig({
  chains: [avalanche],
  transports: {
    "43114": http(),
  },
  connectors: [
    mock({
      accounts: ["0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"],
    }),
  ],
});

const mocks = vi.hoisted(() => {
  return {
    writeContract: vi.fn().mockImplementation(async () => "0x..."),
  };
});

vi.mock("wagmi/actions", async (importActual) => {
  const actual = await importActual<typeof import("wagmi/actions")>();

  return {
    ...actual,
    writeContract: mocks.writeContract,
  };
});

it("test", async () => {
  const { accounts } = await connect(testConfig, {
    connector: testConfig.connectors[0],
  });

  console.log({ accounts });

  mocks.writeContract.mockImplementationOnce(() => zeroAddress);

  const result = await approve({
    tokenAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    spenderAddress: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    amount: 1.22,
  });

  console.log({ result });

  expect(mocks.writeContract).toHaveBeenCalledOnce();
  
  console.log({
    "mocks.writeContract.mock.lastCall": mocks.writeContract.mock.lastCall,
  });

  expect(mocks.writeContract.mock.lastCall[1].address).toBe(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );
  expect(mocks.writeContract.mock.lastCall[1].functionName).toBe("approve");
  expect(mocks.writeContract.mock.lastCall[1].args).toStrictEqual([
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    1220000000000000000n,
  ]);
});
