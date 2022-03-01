import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import USDC from "../abi/contracts/USDC.sol/USDC.json";
import {
  error,
  Return,
  ReturnNumber,
  ReturnProject,
  ReturnString,
} from "../interfaces/return";
import { Context } from "../interfaces/context";
import { useContext } from "react";

export function useFunctions() {
  const { provider, network, user } = useContext(Context);

  const getENS = async (address: string): Promise<string> => {
    try {
      const name = await provider.lookupAddress(address);
      if (name) return name;
    } catch {
      console.log("no ens!");
    }

    return `${address.substring(0, 5)}...${address.substring(
      address.length - 5
    )}`;
  };
  const getAvatar = async (address: string): Promise<string> => {
    try {
      const avatar = await provider.getAvatar(address);
      if (avatar) return avatar;
    } catch {
      console.log("no ens!");
    }
    return "";
  };

  const contract = (signer = false) =>
    new ethers.Contract(
      network.contract,
      Donations.abi,
      signer ? provider.getSigner() : provider
    );

  const coin = (address: string, signer = false) =>
    new ethers.Contract(
      address,
      USDC.abi,
      signer ? provider.getSigner() : provider
    );

  // Read functions
  const getProject = async (projectId: number): Promise<ReturnProject> => {
    try {
      const result = await contract().projects(projectId);
      return {
        result: {
          title: result.title,
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
      const result = await contract().uri(projectId);
      return { result };
    } catch (e) {
      return error("Can't get token uri", e);
    }
  };

  //Write functions
  const startProject = async (
    coin: string,
    title: string,
    goal: number,
    uri: string
  ): Promise<Return> => {
    try {
      const result = await contract(true).startProject(
        coin,
        title,
        ethers.utils.parseEther(goal.toString()),
        uri
      );
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Starting project failed", e);
    }
  };

  const editProject = async (
    projectId: number,
    goal: number,
    stylingUri: string
  ): Promise<Return> => {
    try {
      const result = await contract(true).editProject(
        projectId,
        ethers.utils.parseEther(goal.toString()),
        stylingUri
      );
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Editing project failed", e);
    }
  };

  const donate = async (
    projectId: number,
    donation: number,
    message: string,
    coinAddress: string
  ): Promise<Return> => {
    try {
      const contractObj = contract(true);
      const coinObj = coin(coinAddress, true);
      const donationInWei = ethers.utils.parseEther(donation.toString());

      const allowance = await coinObj.allowance(
        user?.address,
        contractObj.address
      );
      if (donationInWei.gt(allowance)) {
        const result = await coinObj.approve(
          contractObj.address,
          donationInWei
        );
        await result.wait(1);
      }

      const result2 = await contract(true).donate(
        projectId,
        ethers.utils.parseEther(donation.toString()),
        message
      );
      await result2.wait(1);
      return {};
    } catch (e) {
      return error("Donation failed", e);
    }
  };

  const endProject = async (projectId: number): Promise<Return> => {
    try {
      const result = await contract(true).endProject(projectId);
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Ending project failed", e);
    }
  };

  const getProjectsCount = async (): Promise<ReturnNumber> => {
    try {
      const result = await contract(false).projectsCount();
      return { result: result.toNumber() };
    } catch (e) {
      return error("Error loading projects", e);
    }
  };
  return {
    getENS,
    getAvatar,
    getTokenUri,
    getProjectId,
    getCoinBalance,
    getProject,
    coin,
    contract,
    startProject,
    editProject,
    endProject,
    donate,
    getProjectsCount,
  };
}
