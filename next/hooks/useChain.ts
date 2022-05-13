import { ethers } from "ethers";
import { getNetwork } from "../config";
import { useContract, erc20ABI, useAccount, useSigner, useNetwork } from 'wagmi'

export const factoryAbi = [
  "function newCollection(string memory title,address coin,string memory ipfs)",
];

export const contractAbi = [
  "function donate(uint256 amount,string memory message)",
  "function setIPFS(string memory _ipfs)",
  "function addContent(string memory _ipfs)",
  "function startVote(uint256 time, string memory data)",
  "function newVote(uint256 voteId, uint256 answer)",
  "event NewDonation(uint256 id,address owner,uint256 amount,string message)"
];

export default function useChain({ contractAddress, coinAddress }: { contractAddress?: string, coinAddress?: string }) {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain: chain } = useNetwork()
  const factory = useContract({ addressOrName: getNetwork(chain?.id).factory, contractInterface: factoryAbi, signerOrProvider: signer })
  const contract = useContract({ addressOrName: contractAddress ?? ethers.constants.AddressZero, contractInterface: contractAbi, signerOrProvider: signer })
  const coin = useContract({ addressOrName: coinAddress ?? ethers.constants.AddressZero, contractInterface: erc20ABI, signerOrProvider: signer })

  async function newCollection(title: string, coin: string, ipfs: string) {
    try {
      const result = await factory.newCollection(title, coin, ipfs);
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
      const result = await contract.setIPFS(ipfs);
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
      const result = await contract.donate(amount, message)
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error with donating!"
  }
  async function startVote(time: ethers.BigNumber, data: string) {
    try {
      const result = await contract.startVote(time, data)
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error with starting vote!"
  }

  async function newVote(voteId: ethers.BigNumber, answer: ethers.BigNumber) {
    try {
      const result = await contract.newVote(voteId, answer)
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error with new vote!"
  }

  async function addContent(data: string) {
    try {
      const result = await contract.addContent(data)
      await result.wait(1);
      return
    }
    catch (e) {
      console.log(e)
    }
    return "Error with adding content!"
  }

  async function getAllowance() {
    if (account) {
      try {
        const result = await coin.allowance(account.address, contractAddress)
        return result as ethers.BigNumber
      }
      catch (e) {
        console.log(e)
      }
    }
    return ethers.BigNumber.from("0")
  }
  async function approve(amount: ethers.BigNumber) {
    if (account && contractAddress) {
      try {
        const result = await coin.approve(contractAddress, amount)
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
    if (account) {
      try {
        const result = await coin.balanceOf(account.address)
        return result as ethers.BigNumber
      }
      catch (e) {
        console.log(e)
      }
    }
    return ethers.BigNumber.from("0")
  }
  return { startVote, newVote, addContent, newCollection, donate, getBalance, approve, getAllowance, setIPFS }
}