import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import DonationsToken from "./../abi/contracts/DonationsToken.sol/DonationsToken.json";
import USDC from "../abi/contracts/USDC.sol/USDC.json";
import {
  error,
  Return,
  ReturnNumber,
  ReturnProject,
  ReturnString,
} from "../consts/interfaces";
import { Context } from "../context";
import { useContext } from "react";

export function useFunctions() {
  const { provider, network, user } = useContext(Context);

  const contract = () =>
    new ethers.Contract(
      network.contract, // Todo change
      Donations.abi,
      provider?.getSigner()
    );

  const token = () =>
    new ethers.Contract(
      network.token, // Todo change
      DonationsToken.abi,
      provider?.getSigner()
    );

  const coin = (address: string) =>
    new ethers.Contract(address, USDC.abi, provider?.getSigner());

  const startProject = async (
    coin: string,
    title: string,
    goal: number,
    uri: string
  ): Promise<ReturnString> => {
    try {
      const result = await contract().startProject(
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
  };

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

  const editProject = async (
    projectId: number,
    goal: number,
    stylingUri: string
  ): Promise<Return> => {
    try {
      const result = await contract().editProject(
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
      const contractObj = contract();
      const coinObj = coin(coinAddress);
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

      const result2 = await contract().donate(
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

  const end = async (projectId: number): Promise<Return> => {
    try {
      const result = await contract().endProject(projectId);
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Ending project failed", e);
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
    end,
    donate,
    editProject,
    getProject,
    startProject,
    coin,
    token,
    contract,
  };
}
