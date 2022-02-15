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
  contract: "0x991c803b678ed1724D7c769F8a5C61242989CaeD",
  token: "0x746F70f9d0Aadb03066C9EB210463040AF5d5613",
  coins: [
    { value: "0x352841Aab4b9164A1d34b245acE733CCBAc4DF86", label: "My coin" },
    { value: "0x12297e40007Ff7DB9618F959A842877b42f5FE08", label: "USD" },
    { value: "0xc778417e063141139fce010982780140aa0cd5ab", label: "WETH" },
  ],
};

export const networks: NetworkInfo[] = [rinkeby,localhost];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};