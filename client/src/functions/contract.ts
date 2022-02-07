import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import DonationsToken from "./../abi/contracts/DonationsToken.sol/DonationsToken.json";
import USDC from "../abi/contracts/USDC.sol/USDC.json";
import { Project } from "../consts/interfaces";

export const contract = (provider: Web3Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS!,
    Donations.abi,
    provider
  );

const token = (provider: Web3Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REACT_APP_TOKEN_ADDRESS!,
    DonationsToken.abi,
    provider
  );

export const coin = (provider: Web3Provider | ethers.Signer, address: string) =>
  new ethers.Contract(address, USDC.abi, provider);

export async function startProject(
  provider: Web3Provider,
  coin: string,
  title: string,
  goal: number,
  uri: string
): Promise<string> {
  const result = await contract(provider.getSigner()).startProject(
    coin,
    title,
    ethers.utils.parseEther(goal.toString()),
    uri
  );
  await result.wait(1);
  return title;
}

export async function getProject(
  provider: Web3Provider,
  projectId: number
): Promise<Project> {
  const result = await contract(provider.getSigner()).projects(projectId);
  return {
    goal: Number(ethers.utils.formatEther(result.goal)),
    balance: Number(ethers.utils.formatEther(result.balance)),
    owner: result.owner,
    coin: result.coin,
    uri: result.uri,
    active: result.active,
  };
}

export async function editProject(
  provider: Web3Provider,
  projectId: number,
  goal: number,
  stylingUri: string
) {
  const result = await contract(provider.getSigner()).editProject(
    projectId,
    ethers.utils.parseEther(goal.toString()),
    stylingUri
  );
  await result.wait(1);
}

export async function donate(
  provider: Web3Provider,
  projectId: number,
  donation: number,
  message: string,
  coinAddress: string
) {
  const signer = provider.getSigner();
  const contractObj = contract(signer);
  const coinObj = coin(signer, coinAddress);
  const donationInWei = ethers.utils.parseEther(donation.toString());

  const allowance = await coinObj.allowance(
    await signer.getAddress(),
    contractObj.address
  );
  if (donationInWei.gt(allowance)) {
    const result = await coinObj.approve(contractObj.address, donationInWei);
    await result.wait(1);
  }

  const result2 = await contract(provider.getSigner()).donate(
    projectId,
    ethers.utils.parseEther(donation.toString()),
    message
  );
  await result2.wait(1);
}

export async function end(provider: Web3Provider, projectId: number) {
  const result = await contract(provider.getSigner()).endProject(projectId);
  await result.wait(1);
}

export async function getCoinBalance(
  provider: Web3Provider,
  coinAddress: string
): Promise<number> {
  try {
    const address = await provider.getSigner().getAddress();
    const balance = await coin(provider, coinAddress).balanceOf(address);
    return Number(ethers.utils.formatEther(balance));
  } catch {
    return 0;
  }
}

export async function getProjectId(
  provider: Web3Provider,
  title: string
): Promise<number> {
  const result = await contract(provider).titles(title);
  return result.toNumber();
}

export async function getTokenUri(
  provider: Web3Provider,
  projectId: number
): Promise<string> {
  const result = await token(provider).uri(projectId);
  return result;
}
