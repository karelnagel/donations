import { useContext } from "react";
import { Context } from "../idk/context";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { factoryAddress } from "../idk/config";

export const factoryAbi = [
  "function newToken(string memory title,address coin,address projectOwner)",
];

export const contractAbi = [
  "function newProject(address coin, address projectOwner)",
  "function end(uint256 id)",
  "function donate(uint256 id,uint256 amount,string memory message)",
  "event NewToken(uint256 id,uint256 projectId,address owner,uint256 amount,string message)"
];

export const coinAbi = [
  "function balanceOf(address owner) view returns (uint)",
  "function approve(address spender,uint256 amount)",
  "function allowance(address owner,address spender) view returns (uint)",
];

export default function useChain({ contractAddress, projectId, coinAddress }: { contractAddress?: string, projectId?: string, coinAddress?: string }) {
  const { provider, user } = useContext(Context)

  const factory = (pro?: JsonRpcProvider) => {
    if (!factoryAddress || !provider) return
    return new ethers.Contract(factoryAddress, factoryAbi, pro ?? provider?.getSigner())
  }
  const contract = (pro?: JsonRpcProvider) => {
    if (!contractAddress || !provider) return
    return new ethers.Contract(contractAddress, contractAbi, pro ?? provider?.getSigner())
  }
  const coin = (pro?: JsonRpcProvider) => {
    if (!coinAddress || !provider) return
    return new ethers.Contract(coinAddress!, coinAbi, pro ?? provider.getSigner())
  }

  async function newContract(title: string, coin: string, projectOwner: string) {
    try {
      const result = await factory()!.newToken(title, coin, projectOwner);
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
      return "Error starting new contract!"
    }

  }
  async function newProject(coin: string, projectOwner: string) {
    try {
      const result = await contract()!.newProject(coin, projectOwner);
      await result.wait(1)
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error starting new project!'"
  }
  async function end() {
    if (projectId) {
      try {
        const result = await contract()!.end(projectId)
        await result.wait(1)
        return
      }
      catch (e) {
        console.log(e)
      }
    }
    return "Error ending the project!"
  }

  async function donate(amount: ethers.BigNumber, message: string) {
    if (projectId) {
      try {
        const result = await contract()!.donate(projectId, amount, message)
        await result.wait(1);
        return
      }
      catch (e) {
        console.log(e)
      }
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
  return { newContract, newProject, end, donate, getBalance, approve, getAllowance }
}