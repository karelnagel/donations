import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { Factory, USDC, Collection } from "../typechain";

export async function deployfactory(url: string): Promise<Factory> {
    // Deploy contract
    const Factory = await ethers.getContractFactory("Factory");
    const factory = await upgrades.deployProxy(Factory, [url], { kind: "uups" }) as Factory;
    await factory.deployed();
    return factory
}
export async function deployCoin(deployer: SignerWithAddress): Promise<USDC> {
    // Deploy usdc
    const USDC = await ethers.getContractFactory("USDC");
    const usdc = await USDC.connect(deployer).deploy();
    await usdc.deployed();
    return usdc
}
export async function deployCollection(factory: Factory, deployer: SignerWithAddress, title: string, coin: string, ipfs: string): Promise<Collection> {
    await factory.connect(deployer).newCollection(title, coin, ipfs)
    const address = await factory.collections(title)

    const Collection = await ethers.getContractFactory("Collection");
    const collection = Collection.attach(address);
    return collection
}