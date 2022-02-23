import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("Donations");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`CONTRACT=${contract.address} yarn verify`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
