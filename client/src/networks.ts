import { NetworkInfo } from "./interfaces/context";

const localhost = {
  chainId: 31337,
  name: "localhost",
  contract: process.env.REACT_APP_CONTRACT_ADDRESS!,
  token: process.env.REACT_APP_TOKEN_ADDRESS!,
  coins: [
    { value: process.env.REACT_APP_USDC_ADDRESS!, label: "USDC" },
  ],
};

const rinkeby = {
  chainId: 4,
  name: "rinkeby",
  contract: "0x7d261b57F0aD3b13eD2f618a24e0D655Ad4C7B90",
  token: "0x0C6fCB79743D4F6dE21C6351fFA8Acd7AA4136F8",
  coins: [
    { value: "0x352841Aab4b9164A1d34b245acE733CCBAc4DF86", label: "USD" },
    { value: "0xc778417e063141139fce010982780140aa0cd5ab", label: "WETH" },
  ],
};

export const networks: NetworkInfo[] = [rinkeby,localhost];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};