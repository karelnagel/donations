import { NetworkInfo } from "./interfaces";

const localhost = {
  chainId: 31337,
  name: "Localhost",
  contract: process.env.REACT_APP_CONTRACT_ADDRESS!,
  token: process.env.REACT_APP_TOKEN_ADDRESS!,
  coins: [
    { value: process.env.REACT_APP_USDC_ADDRESS!, label: "USDC" },
    { value: "dai.eth", label: "DAI" },
  ],
};
const goerli = {
  chainId: 5,
  name: "Goerli",
  contract: process.env.REACT_APP_CONTRACT_ADDRESS!,
  token: process.env.REACT_APP_TOKEN_ADDRESS!,
  coins: [
    { value: process.env.REACT_APP_USDC_ADDRESS!, label: "USDC" },
    { value: "dai.eth", label: "DAI" },
  ],
};

export const networks: NetworkInfo[] = [localhost, goerli];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};
export const networkNames=networks.map(n=>n.name)