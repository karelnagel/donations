
import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("DonationsToken");
  const token = await Token.deploy();
  await token.deployed();

  // Deploy token
  const Contract = await ethers.getContractFactory("Donations");
  const contract = await Contract.deploy(token.address);
  await contract.deployed();

  // Deploy token
  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();

  // Change token owner to Contract
  token.transferOwnership(contract.address);

  console.log("Contract:", contract.address);
  console.log("token:", token.address);
  console.log("coin:", usdc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
