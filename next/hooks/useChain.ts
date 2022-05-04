import { useContext } from "react";
import { Context } from "../idk/context";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { network } from "../config";

export const factoryAbi = [
  "function newCollection(string memory title,address coin,string memory ipfs)",
];

export const contractAbi = [
  "function donate(uint256 amount,string memory message)",
  "function setIPFS(string memory ipfs)",
  "event NewDonation(uint256 id,address owner,uint256 amount,string message)"
];

export const coinAbi = [
  "function balanceOf(address owner) view returns (uint)",
  "function approve(address spender,uint256 amount)",
  "function allowance(address owner,address spender) view returns (uint)",
];

export default function useChain({ contractAddress, coinAddress }: { contractAddress?: string, coinAddress?: string }) {
  const { provider, user } = useContext(Context)

  const factory = (pro?: JsonRpcProvider) => {
    if (!network.factory || !provider) return
    return new ethers.Contract(network.factory, factoryAbi, pro ?? provider?.getSigner())
  }
  const contract = (pro?: JsonRpcProvider) => {
    if (!contractAddress || !provider) return
    return new ethers.Contract(contractAddress, contractAbi, pro ?? provider?.getSigner())
  }
  const coin = (pro?: JsonRpcProvider) => {
    if (!coinAddress || !provider) return
    return new ethers.Contract(coinAddress!, coinAbi, pro ?? provider.getSigner())
  }

  async function newCollection(title: string, coin: string, ipfs: string) {
    try {
      const result = await factory()!.newCollection(title, coin, ipfs);
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
      return "Error starting new contract!"
    }
  }
  async function setIPFS(ipfs: string) {
    try {
      const result = await contract()!.setIPFS(ipfs);
      await result.wait(1)
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error setting new ipfs!'"
  }

  async function donate(amount: ethers.BigNumber, message: string) {
    try {
      const result = await contract()!.donate(amount, message)
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error with donating!"
  }
  async function getAllowance() {
    if (user) {
      try {
        const result = await coin()!.allowance(user.address, contractAddress)
        return result as ethers.BigNumber
      }
      catch (e) {
        console.log(e)
      }
    }
    return ethers.BigNumber.from("0")
  }
  async function approve(amount: ethers.BigNumber) {
    if (user && contractAddress) {
      try {
        const result = await coin()!.approve(contractAddress, amount)
        await result.wait(1)
        return
      }
      catch (e) {
        console.log(e)
      }
    }
    return "Error with approving ERC20 spending"
  }
  async function getBalance() {
    if (user) {
      try {
        const result = await coin()!.balanceOf(user.address)
        return result as ethers.BigNumber
      }
      catch (e) {
        console.log(e)
      }
    }
    return ethers.BigNumber.from("0")
  }
  return { newCollection, donate, getBalance, approve, getAllowance, setIPFS }
}