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

export const networks: NetworkInfo[] = [rinkeby, localhost];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};
