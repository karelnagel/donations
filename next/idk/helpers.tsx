import { ethers } from "ethers";
import { network } from "../config";

export function getProjectId(title: string, projectId: string | number) {
  return `${title}_p${projectId}`;
}
export function getTokenId(title: string, tokenId: string | number) {
  return `${title}_t${tokenId}`;
}

export function short(address: string | null | undefined) {
  if (!address) return "";
  return `${address.substr(0, 5)}...${address.substr(address.length - 5)}`;
}


export const toCoin = (wei: string) => {
  return wei ? ethers.utils.formatEther(wei) : "0.0";
};
export const toWei = (ether: string) => {
  return ether ? ethers.utils.parseEther(ether).toString() : "0";
};
export const sameAddr = (address1?: string, address2?: string) => {
  if (!address1 || !address2) return false;
  return address1.toLowerCase() === address2.toLowerCase();
};

export const coinName = (address?:string) => network.coins.find((c) => sameAddr(c.address, address))?.coin ?? "ERC20";

export function getImage(hash:string){
  return `${network.ipfsGateway}${hash}`
}