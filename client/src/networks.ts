import { NetworkInfo } from "./interfaces/context";

const localhost = {
  chainId: 31337,
  name: "localhost",
  etherscan: "",
  opensea: "",
  openseaCollection: "",
  contract: process.env.REACT_APP_CONTRACT_ADDRESS!,
  coins: [{ value: process.env.REACT_APP_USDC_ADDRESS!, label: "USDC" }],
};

const rinkeby = {
  chainId: 4,
  name: "rinkeby",
  opensea: "https://testnets.opensea.io/",
  openseaCollection: "donationss",
  etherscan: "https://rinkeby.etherscan.io/address/",
  contract: "0xcD6DA1089d1eF2273D0827F18b566Cef36F616c6",
  coins: [
    { value: "0x352841Aab4b9164A1d34b245acE733CCBAc4DF86", label: "My coin" },
    { value: "0x12297e40007Ff7DB9618F959A842877b42f5FE08", label: "USD" },
    { value: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", label: "DAI" },
  ],
};

const polygon = {
  chainId: 137,
  name: "polygon-mainnet",
  opensea: "https://opensea.io/",
  openseaCollection: "ethdon",
  etherscan: "https://polygonscan.com/address/",
  contract: "0xC5F4e7eD8D4e96D59Ad568cC3cFF8A1CFAAB6160",
  coins: [
    { value: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", label: "WETH" },
    { value: "0x0000000000000000000000000000000000001010", label: "MATIC" },
    { value: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", label: "WBTC" },
    { value: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", label: "USDC" },
    { value: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", label: "USDT" },
  ],
};

export const networks: NetworkInfo[] = [rinkeby, polygon, localhost];

export const defaultNetwork =
  networks[Number(process.env.REACT_APP_DEFAULT_NETWORK) ?? 0];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};
