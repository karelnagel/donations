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
  contract: "0xEc018cA938556f5A344004D36E6363069e59C727",
  token: "0xF7892f6B302bca8a4AeA744e0A0e2ba5825d1463",
  coins: [
    { value: "0x01718d1568263BdFABBcB5Eda36405B09de19caE", label: "My Coin" },
    { value: "0x07865c6e87b9f70255377e024ace6630c1eaa37f", label: "USDC" },
    { value: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", label: "WETH" },
  ],
};

export const networks: NetworkInfo[] = [localhost, goerli];

export const getNetworkInfo = (chainId: number): NetworkInfo | undefined => {
  return networks.find((n) => n.chainId === chainId);
};
export const networkNames=networks.map(n=>n.name)