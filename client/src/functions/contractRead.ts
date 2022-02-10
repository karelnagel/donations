import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import DonationsToken from "../abi/contracts/DonationsToken.sol/DonationsToken.json";
import USDC from "../abi/contracts/USDC.sol/USDC.json";
import {
  error,
  ReturnNumber,
  ReturnProject,
  ReturnString,
} from "../consts/interfaces";
import { Context } from "../context";
import { useContext } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";

export async function getENS(provider: JsonRpcProvider, address: string) :Promise<string|undefined>{
  try {
    return await provider.lookupAddress(address) ?? undefined;
  } catch {
    console.log("no ens!");
  }
  return undefined;
}
export function useReadFunctions() {
  const { provider, network } = useContext(Context);

  const contract = () =>
    new ethers.Contract(
      network.contract, // Todo change
      Donations.abi,
      provider
    );

  const token = () =>
    new ethers.Contract(
      network.token, // Todo change
      DonationsToken.abi,
      provider
    );

  const coin = (address: string) =>
    new ethers.Contract(address, USDC.abi, provider);

  const getProject = async (projectId: number): Promise<ReturnProject> => {
    try {
      const result = await contract().projects(projectId);
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
  };

  const getCoinBalance = async (
    coinAddress: string,
    address: string
  ): Promise<ReturnNumber> => {
    try {
      const balance = await coin(coinAddress).balanceOf(address);
      return { result: Number(ethers.utils.formatEther(balance)) };
    } catch (e) {
      return error("Can't get coin balance", e);
    }
  };

  const getProjectId = async (title: string): Promise<ReturnNumber> => {
    try {
      const result = (await contract().titles(title)).toNumber();
      return { result };
    } catch (e) {
      return error("Can't get project id ", e);
    }
  };

  const getTokenUri = async (projectId: number): Promise<ReturnString> => {
    try {
      const result = await token().uri(projectId);
      return { result };
    } catch (e) {
      return error("Can't get token uri", e);
    }
  };
  return {
    getTokenUri,
    getProjectId,
    getCoinBalance,
    getProject,
    coin,
    token,
    contract,
    getENS,
  };
}
