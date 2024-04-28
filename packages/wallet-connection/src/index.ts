import { avalanche } from "wagmi/chains";
import { createConfig, http } from "wagmi";

const network = avalanche;


const wagmiConfig = createConfig({
  chains: [network],
  transports: {
    [network.id]: http(),
  },
});

export { wagmiConfig };
