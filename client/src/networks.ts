import { NetworkInfo } from "./interfaces/context";

const localhost = {
  chainId: 31337,
  name: "localhost",
  etherscan: "",
  opensea: "",
  openseaCollection: "",
  contract: process.env.REACT_APP_CONTRACT_ADDRESS!,
  token: process.env.REACT_APP_TOKEN_ADDRESS!,
  coins: [{ value: process.env.REACT_APP_USDC_ADDRESS!, label: "USDC" }],
};

const rinkeby = {
  chainId: 4,
  name: "rinkeby",
  opensea: "https://testnets.opensea.io/",
  openseaCollection: "donations3",
  etherscan: "https://rinkeby.etherscan.io/address/",
  contract: "0xAc80E61208F86d41fa63272ea7769a49168fCE0c",
  token: "0x17b04e5425b8801FEcec814A8B0cb9c01942cf33",
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
