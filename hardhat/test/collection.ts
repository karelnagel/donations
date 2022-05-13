import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { USDC, Factory, Collection } from "../typechain";
import { deployCoin, deployCollection, deployfactory } from "./helpers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "@ethersproject/bignumber";
chai.use(solidity);
const { expect } = chai;

const uri = "https://streamint.xyz/"
const title = "title"
const ipfs = "ipfs"
let factory: Factory;
let collection: Collection;
let usdc: USDC;
let acc1: SignerWithAddress;
let acc2: SignerWithAddress;
let acc3: SignerWithAddress;

describe("Collection", function () {

  before(async () => {
    [acc1, acc2, acc3] = await ethers.getSigners();
    factory = await deployfactory(uri);
    usdc = await deployCoin(acc2);
    collection = await deployCollection(factory, acc1, title, usdc.address, ipfs)
  })

  describe("Deployment", () => {
    it("Has correct params", async () => {
      expect(await collection.title()).equal(title)
      expect(await collection.coin()).equal(usdc.address)
      expect(await collection.factory()).equal(factory.address)
    })
    it("Has correct contractURI", async () => {
      expect(await collection.contractURI()).equal(`${uri}${title}`)
    })
    it("Has correct tokenURI", async () => {
      expect(await collection.tokenURI(1)).equal(`${uri}${title}/1`)
    })
  })

  describe("Set IPFS", () => {
    const newIPFS = "new ipfs"
    it("Not owner can't set", async () => {
      await expect(collection.connect(acc2).setIPFS(newIPFS)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Owner can set", async () => {
      await expect(collection.connect(acc1).setIPFS(newIPFS)).to.emit(collection, "SetIPFS").withArgs(newIPFS)
    })
  })

  describe("Donate", () => {
    const newIPFS = "new ipfs"
    const amount = ethers.utils.parseEther("10")
    const message = "message"
    let acc1Balance: BigNumber;
    let acc2Balance: BigNumber;

    before(async () => {
      acc1Balance = await usdc.balanceOf(acc1.address)
      acc2Balance = await usdc.balanceOf(acc2.address)
    })
    it("Fails when amount is 0", async () => {
      await expect(collection.connect(acc2).donate(0, message)).to.be.revertedWith("Donation amount is 0")
    })
    it("Fails when not approved", async () => {
      await expect(collection.connect(acc3).donate(amount, message)).to.be.revertedWith("ERC20: insufficient allowance")
    })
    it("Fails when not enough money", async () => {
      await usdc.connect(acc3).approve(collection.address, amount);
      await expect(collection.connect(acc3).donate(amount, message)).to.be.revertedWith("ERC20: transfer amount exceeds balance")
    })
    it("Successful donation", async () => {
      await usdc.connect(acc2).approve(collection.address, amount);
      await expect(collection.connect(acc2).donate(amount, message)).to.emit(collection, "NewDonation").withArgs(1, amount, message, acc2.address)

      expect(await collection.ownerOf(1)).equal(acc2.address)
      expect(await collection.balanceOf(acc2.address)).equal(1)
      expect(await usdc.balanceOf(acc1.address)).equal(acc1Balance.add(amount))
      expect(await usdc.balanceOf(acc2.address)).equal(acc2Balance.sub(amount))
    })
  })

  describe("Add content", () => {
    const content = "content ipfs"
    it("Not owner can't set", async () => {
      await expect(collection.connect(acc2).addContent(content)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Owner can set", async () => {
      await expect(collection.connect(acc1).addContent(content)).to.emit(collection, "AddContent").withArgs(content)
    })
  })
  describe("Voting", () => {
    const time = 1 * 60 * 60; // 1hr
    const voteId = 1
    const data = "data ipfs"

    it("Not owner can't start", async () => {
      await expect(collection.connect(acc2).startVote(time, data)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Owner can start", async () => {
      const blockNr = await ethers.provider.getBlockNumber()
      const endTime = (await ethers.provider.getBlock(blockNr)).timestamp + time + 1
      await expect(collection.connect(acc1).startVote(time, data)).to.emit(collection, "StartVote").withArgs(voteId, endTime, data)
    })

    describe("New vote", () => {
      const answer = 1

      it("Successful vote", async () => {
        await expect(collection.connect(acc1).newVote(voteId, answer)).to.emit(collection, "NewVote").withArgs(voteId, answer, acc1.address)
      })
      it("Successful vote right before close", async () => {

        await ethers.provider.send('evm_increaseTime', [time - 1]);
        await expect(collection.connect(acc2).newVote(voteId, answer)).to.emit(collection, "NewVote").withArgs(voteId, answer, acc2.address)
      })

      it("Failed when time passed", async () => {
        await expect(collection.connect(acc1).newVote(voteId, answer)).revertedWith("Voting ended")
      })
    })
  })


})

