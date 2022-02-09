import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import DonationsToken from "./../abi/contracts/DonationsToken.sol/DonationsToken.json";
import USDC from "../abi/contracts/USDC.sol/USDC.json";
import { error, Return, ReturnNumber, ReturnProject, ReturnString } from "../consts/interfaces";

export const contract = (provider: Web3Provider | ethers.Signer) =>
  new ethers.Contract(
    "0x7d261b57F0aD3b13eD2f618a24e0D655Ad4C7B90", // Todo change
    Donations.abi,
    provider
  );

const token = (provider: Web3Provider | ethers.Signer) =>
  new ethers.Contract(
    "0x0C6fCB79743D4F6dE21C6351fFA8Acd7AA4136F8", // Todo change
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
): Promise<ReturnString> {
  try {
    const result = await contract(provider.getSigner()).startProject(
      coin,
      title,
      ethers.utils.parseEther(goal.toString()),
      uri
    );
    await result.wait(1);
    return { result: title };
  } catch (e) {
    return error("Starting project failed", e);
  }
}

export async function getProject(
  provider: Web3Provider,
  projectId: number
): Promise<ReturnProject> {
  try {
    const result = await contract(provider.getSigner()).projects(projectId);
    return {
      result: {
        goal: Number(ethers.utils.formatEther(result.goal)),
        balance: Number(ethers.utils.formatEther(result.balance)),
        owner: result.owner,
        coin: result.coin,
        uri: result.uri,
        active: result.active,
      },
    };
  } catch (e) {
    return error("Getting project data failed", e);
  }
}

export async function editProject(
  provider: Web3Provider,
  projectId: number,
  goal: number,
  stylingUri: string
): Promise<Return> {
  try {
    const result = await contract(provider.getSigner()).editProject(
      projectId,
      ethers.utils.parseEther(goal.toString()),
      stylingUri
    );
    await result.wait(1);
    return {};
  } catch (e) {
    return error("Editing project failed", e);
  }
}

export async function donate(
  provider: Web3Provider,
  projectId: number,
  donation: number,
  message: string,
  coinAddress: string
): Promise<Return> {
  try {
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
    return {};
  } catch (e) {
    return error("Donation failed", e);
  }
}

export async function end(provider: Web3Provider, projectId: number) {
  try {
    const result = await contract(provider.getSigner()).endProject(projectId);
    await result.wait(1);
  } catch (e) {
    return error("Ending project failed", e);
  }
}

export async function getCoinBalance(
  provider: Web3Provider,
  coinAddress: string,
  address:string
): Promise<ReturnNumber> {
  try {
    const balance = await coin(provider, coinAddress).balanceOf(address);
    return { result: Number(ethers.utils.formatEther(balance)) };
  } catch (e) {
    return error("Can't get coin balance", e);
  }
}

export async function getProjectId(
  provider: Web3Provider,
  title: string
): Promise<ReturnNumber> {
  try {
    const result = (await contract(provider).titles(title)).toNumber();
    return { result };
  } catch (e) {
    return error("Can't get project id ", e);
  }
}

export async function getTokenUri(
  provider: Web3Provider,
  projectId: number
): Promise<ReturnString> {
  try {
    const result = await token(provider).uri(projectId);
    return { result };
  } catch (e) {
    return error("Can't get token uri", e);
  }
}