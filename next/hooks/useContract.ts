import { useContext } from "react";
import { Context } from "../idk/context";
import { ethers } from "ethers";

const factoryAbi = [
  "function newToken(string memory title,address coin,address projectOwner)",
];

const contractAbi = [
  "function newProject(address coin, address projectOwner)",
  "function end(uint256 id)",
  "function donate(uint256 id,uint256 amount,string memory message)",
];

const coinAbi = [
  "function balanceOf(address owner) view returns (uint)",
  "function approve(address spender,uint256 amount)",
  "function allowance(address owner,address spender) view returns (uint)",
];

const factoryAddress = process.env.NEXT_PUBLIC_FACTORY
export default function useContract({ contractAddress, projectId, coinAddress }: { contractAddress?: string, projectId?: string, coinAddress?: string }) {
  const { provider, user } = useContext(Context)

  const factory = () => {
    if (!factoryAddress || !provider) return
    return new ethers.Contract(factoryAddress, factoryAbi, provider?.getSigner())
  }
  const contract = () => {
    if (!contractAddress || !provider) return
    return new ethers.Contract(contractAddress, contractAbi, provider?.getSigner())
  }
  const coin = () => {
    if (!coinAddress || !provider) return
    return new ethers.Contract(coinAddress!, coinAbi, provider.getSigner())
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