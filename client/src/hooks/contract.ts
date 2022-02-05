import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers"

import Donations from "./../abi/contracts/Donations.sol/Donations.json"
import DonationsToken from "./../abi/contracts/DonationsToken.sol/DonationsToken.json"
import USDC from "./../abi/contracts/USDC.sol/USDC.json"
const contract = (provider: Web3Provider | ethers.Signer) => new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS!, Donations.abi, provider);
const tokenContract = (provider: Web3Provider | ethers.Signer) => new ethers.Contract(process.env.REACT_APP_TOKEN_ADDRESS!, DonationsToken.abi, provider);
const usdcContract = (provider: Web3Provider | ethers.Signer) => new ethers.Contract(process.env.REACT_APP_COIN_ADDRESS!, USDC.abi, provider);

export function startProject(provider:Web3Provider){
    await contract(provider).startProject(
        usdc.address,
        "My project",
        ethers.utils.parseEther("10"),
        "styling_uri",
        "token_uri"
      );
}