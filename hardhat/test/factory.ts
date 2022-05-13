import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { USDC, Factory } from "../typechain";
import { deployCoin, deployfactory } from "./helpers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;

const uri = "https://streamint.xyz/"
let factory: Factory;
let usdc: USDC;
let acc1: SignerWithAddress;
let acc2: SignerWithAddress;
let acc3: SignerWithAddress;

describe("Factory", function () {

  before(async () => {
    [acc1, acc2, acc3] = await ethers.getSigners();
    factory = await deployfactory(uri);
    usdc = await deployCoin(acc2);
  })

  describe("Deployment", () => {
    it("Has correct contract uri", async () => {
      const result = await factory.getContractURI("title")
      expect(result).equal(`${uri}title`)
    })

    it("Has correct token uri", async () => {
      const result = await factory.getTokenURI("title", 1)
      expect(result).equal(`${uri}title/1`)
    })
  })

  describe("Set new URI", () => {
    const newUri = "https://twitter.com/"

    it("Not owner can't set uri", async () => {
      await expect(factory.connect(acc2).setURI(newUri)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Setting uri", async () => {
      await expect(factory.setURI(newUri)).to.emit(factory, "SetURI").withArgs(newUri)
      expect(await factory.getContractURI("title")).equal(`${newUri}title`)
      expect(await factory.getTokenURI("title", 1)).equal(`${newUri}title/1`)
    })
  })

  describe("New collection", async () => {
    const title = "good title"
    const ipfs = "ipfs"
    const newCollectionAddress = "0x94099942864EA81cCF197E9D71ac53310b1468D8"

    it("Starting new collection", async () => {
      await expect(factory.newCollection(title, usdc.address, ipfs)).to.emit(factory, "NewCollection").withArgs(title, newCollectionAddress, usdc.address, ipfs, acc1.address)
      expect(await factory.collections(title)).equal(newCollectionAddress)
    })
    it("Can't start collectionwith same name", async () => {
      await expect(factory.newCollection(title, usdc.address, ipfs)).revertedWith("Title already exists")
    })
  })
})

