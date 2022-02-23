import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("Donations");
  const contract = await Contract.deploy();
  await contract.deployed();

  // const USDC = await ethers.getContractFactory("USDC");
  // const usdc = await USDC.deploy();
  // await usdc.deployed();
  // console.log("coin:", usdc.address);

  console.log(
    `CONTRACT=${contract.address} TOKEN=${await contract.token()} yarn verify`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
