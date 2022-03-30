import { BigNumber } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Donations, USDC, DonationsToken } from "../typechain";

let contract: Donations;
let token: DonationsToken;
let usdc: USDC;

let owner: SignerWithAddress;
let investor: SignerWithAddress;

const donation = ethers.utils.parseEther("100");

before("Start", async function () {
  // Getting accounts
  [owner, investor] = await ethers.getSigners();

  // Deploy contract
  const Contract = await ethers.getContractFactory("Donations");
  contract = await Contract.deploy();
  await contract.deployed();

  // Deploy usdc
  const USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.connect(investor).deploy();
  await usdc.deployed();
});

describe("Start project", function () {
  it("emits an event", async function () {
    expect(await contract.startProject("title", usdc.address, "uri", "image 1"))
      .to.emit(contract, "NewToken")
      .withArgs(
        "title",
        "0x8464135c8F25Da09e49BC8782676a84730C318bC",
        owner.address,
        "uri",
        "image 1"
      );
  });

  it("has correct parameters", async function () {
    const tokenAddress = await contract.tokens("title");

    const Token = await ethers.getContractFactory("DonationsToken");
    token = Token.attach(tokenAddress);

    expect(await token.coin()).to.equal(usdc.address);
    expect(await token.owner()).to.equal(owner.address);
    expect(await token.title()).to.equal("title");
    expect(await token.donated()).to.equal(0);
    expect(await token.contractURI()).to.equal("uri");
    expect(await token.active()).to.equal(true);
    expect(await token.donationsCount()).to.equal(0);
    expect(await token.contractURI()).to.equal("uri");
  });

  it("can't create a new project with same title", async function () {
    await expect(
      contract.startProject("title", usdc.address, "uri", "image 1")
    ).to.be.revertedWith("Title already exists");
  });
});

describe("Edit contract uri", function () {
  it("not owners can't edit", async function () {
    await expect(
      token.connect(investor).setContractURI("contract uri 2")
    ).to.be.revertedWith("caller is not the owner");
  });
  it("parameters changed", async function () {
    await token.setContractURI("contract uri 3");
    expect(await token.contractURI()).to.equal("contract uri 3");
  });
});

let userBalance: BigNumber;
let tokenBalance: BigNumber;
let donated: BigNumber;
const Donate = (id: number, projectId: number, image: string) => {
  describe(`Donation #${id}`, function () {
    const message = `I like your project ${id}`;
    before(async function () {
      userBalance = await usdc.balanceOf(investor.address);
      tokenBalance = await usdc.balanceOf(token.address);
      donated = await token.donated();
    });

    it("fails if amount == 0", async function () {
      await expect(
        token.connect(investor).donate(0, message)
      ).to.be.revertedWith("Donation amount is 0");
    });

    it("fails if not enough coins", async function () {
      await expect(token.donate(donation, message)).to.be.revertedWith(
        "transfer amount exceeds balance"
      );
    });

    it("emits event", async function () {
      await usdc.connect(investor).approve(token.address, donation);
      expect(await token.connect(investor).donate(donation, message))
        .to.emit(token, "NewDonation")
        .withArgs(
          id.toString(),
          investor.address,
          donation,
          message,
          projectId.toString()
        );
    });
    it("user has less money", async function () {
      expect(await usdc.balanceOf(investor.address)).to.equal(
        userBalance.sub(donation)
      );
    });
    it("contract has more money ", async function () {
      expect(await usdc.balanceOf(token.address)).to.equal(
        tokenBalance.add(donation)
      );
    });
    it("project balance is correct", async function () {
      expect(await token.donated()).to.equal(donated.add(donation));
    });
    it("user has NFT ", async function () {
      expect(await token.ownerOf(id)).to.equal(investor.address);
    });
    it("token has correct uri ", async function () {
      const result = await token.tokenURI(id);
      const json = atob(result.split(",")[1]);
      const obj = JSON.parse(json);

      const donationInfo = await token.donations(id);

      expect(obj.image).to.equal(image);
      expect(obj.name).to.equal(`Supporter #${id}`);
      expect(obj.description).to.equal(message);
      expect(obj.external_url).to.equal("https://ethdon.xyz/projects/title");
      expect(obj.attributes[0].value.toString())
        .to.equal(donationInfo.amount.toString())
        .to.equal(donation.toString());
      expect(obj.attributes[1].value)
        .to.equal(donationInfo.message)
        .to.equal(message);
      expect(obj.attributes[2].value)
        .to.equal(investor.address.toLowerCase())
        .to.equal("0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
    });
  });
};
Donate(1, 0, "image 1");
Donate(2, 0, "image 1");

describe("New project", async function () {
  it("emits event", async function () {
    expect(await token.newProject("new image"))
      .to.emit(token, "NewProject")
      .withArgs("new image");
  });
});

Donate(3, 1, "new image");
Donate(4, 1, "new image");

describe("Cash out", async function () {
  before(async function () {
    userBalance = await usdc.balanceOf(owner.address);
    tokenBalance = await usdc.balanceOf(token.address);
  });
  it("emits event ", async function () {
    expect(await token.cashOut())
      .to.emit(token, "CashOut")
      .withArgs(tokenBalance);
  });
  it("owner has more money", async function () {
    const balance = await usdc.balanceOf(owner.address);
    expect(balance.toString()).to.equal(
      userBalance.add(tokenBalance).toString()
    );
  });
  it("contract has less money ", async function () {
    const balance = await usdc.balanceOf(token.address);
    expect(balance).to.equal(0);
  });
});

describe("End", async function () {
  before(async function () {
    expect(await token.end()).to.emit(token, "End");
  });

  it("can't donate anymore", async function () {
    await expect(
      token.connect(investor).donate(donation, "Hello")
    ).to.be.revertedWith("Project not active!");
  });
});
