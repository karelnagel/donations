import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("DonationsToken");
  const token = await Token.deploy();
  await token.deployed();

  const Contract = await ethers.getContractFactory("Donations");
  const contract = await Contract.deploy(token.address);
  await contract.deployed();

  // Change token owner to Contract
  token.transferOwnership(contract.address);

  // const USDC = await ethers.getContractFactory("USDC");
  // const usdc = await USDC.deploy();
  // await usdc.deployed();
  // console.log("coin:", usdc.address);

  console.log("Contract:", contract.address);
  console.log("Token:", token.address);
  console.log(
    `CONTRACT=${contract.address} TOKEN=${token.address} yarn verify`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
