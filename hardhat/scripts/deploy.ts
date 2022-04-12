import { ethers } from "hardhat";

const url = "https://ethdon.xyz/api/tokens/"
async function main() {
  const Contract = await ethers.getContractFactory("Factory");
  const contract = await Contract.deploy(url);
  await contract.deployed();

  console.log(`CONTRACT=${contract.address} URL=${url} yarn verify`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
