import { ethers } from "ethers";
import Donations from "../abi/contracts/Donations.sol/Donations.json";
import DonationsToken from "../abi/contracts/DonationsToken.sol/DonationsToken.json";
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
  const token = (address: string, signer = false) =>
    new ethers.Contract(
      address,
      DonationsToken.abi,
      signer ? provider.getSigner() : provider
    );

  const coin = (address: string, signer = false) =>
    new ethers.Contract(
      address,
      USDC.abi,
      signer ? provider.getSigner() : provider
    );

  // Read functions
  const getProject = async (address: string): Promise<ReturnProject> => {
    try {
      const result = await token(address).info();
      return {
        result: {
          title: result.title,
          goal: Number(ethers.utils.formatEther(result.goal)),
          balance: Number(ethers.utils.formatEther(result.balance)),
          owner: result.currentOwner,
          coin: result.coin,
          uri: result.styling,
          image: result.image,
          donationsCount: result.donationsCount,
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

  const getProjectTitle = async (id: number): Promise<ReturnString> => {
    try {
      const result = await contract().titles(id);
      return { result };
    } catch (e) {
      return error("Can't get project id ", e);
    }
  };
  const getProjectAddress = async (title: string): Promise<ReturnString> => {
    try {
      const result = await contract().tokens(title);
      return { result };
    } catch (e) {
      return error("Can't get project id ", e);
    }
  };

  const getTokenUri = async (
    address: string,
    tokenId: number
  ): Promise<ReturnString> => {
    try {
      const result = await token(address).tokenURI(tokenId);
      return { result };
    } catch (e) {
      return error("Can't get token uri", e);
    }
  };

  //Write functions
  const startProject = async (
    title: string,
    coin: string,
    goal: number,
    styling: string,
    image: string
  ): Promise<Return> => {
    try {
      const result = await contract(true).startProject(
        title,
        coin,
        styling,
        image
      );
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Starting project failed", e);
    }
  };

  const editProject = async (
    address: string,
    goal: number,
    stylingUri: string,
    image: string
  ): Promise<Return> => {
    try {
      const result = await token(address, true).edit(
        ethers.utils.parseEther(goal.toString()),
        stylingUri,
        image
      );
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Editing project failed", e);
    }
  };

  const donate = async (
    address: string,
    donation: number,
    message: string,
    coinAddress: string
  ): Promise<Return> => {
    try {
      const tokenObj = token(address, true);
      const coinObj = coin(coinAddress, true);
      const donationInWei = ethers.utils.parseEther(donation.toString());

      const allowance = await coinObj.allowance(
        user?.address,
        tokenObj.address
      );
      if (donationInWei.gt(allowance)) {
        const result = await coinObj.approve(tokenObj.address, donationInWei);
        await result.wait(1);
      }

      const result2 = await tokenObj.donate(
        ethers.utils.parseEther(donation.toString()),
        message
      );
      await result2.wait(1);
      return {};
    } catch (e) {
      return error("Donation failed", e);
    }
  };

  const endProject = async (address: string): Promise<Return> => {
    try {
      const result = await token(address, true).end();
      await result.wait(1);
      return {};
    } catch (e) {
      return error("Ending project failed", e);
    }
  };

  const getProjectCount = async (): Promise<ReturnNumber> => {
    try {
      const result = await contract(false).projectCount();
      return { result: result.toNumber() };
    } catch (e) {
      return error("Error loading projects", e);
    }
  };
  return {
    getENS,
    getAvatar,
    getTokenUri,
    getProjectTitle,
    getCoinBalance,
    getProject,
    coin,
    contract,
    token,
    startProject,
    editProject,
    endProject,
    donate,
    getProjectCount,
    getProjectAddress,
  };
}
