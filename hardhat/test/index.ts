import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Donations, USDC, DonationsToken } from "../typechain";

let contract: Donations;
let token: DonationsToken;
let usdc: USDC;

let owner: SignerWithAddress;
let investor: SignerWithAddress;

const userInitialCoinBalance = ethers.utils.parseEther("10000");
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
    expect(
      await contract.startProject(
        usdc.address,
        "title",
        ethers.utils.parseEther("10"),
        "uri",
        "https://ethdon.xyz/icons/opensea.png"
      )
    )
      .to.emit(contract, "NewProject")
      .withArgs("title", owner.address);
  });

  it("title added to array", async function () {
    const id = await contract.titles(0);
    expect(id).to.equal("title");
  });

  it("has correct parameters", async function () {
    const tokenAddress = await contract.tokens("title");

    const Token = await ethers.getContractFactory("DonationsToken");
    token = Token.attach(tokenAddress);
    const project = await token.info();

    expect(project._coin).to.equal(usdc.address);
    expect(project._owner).to.equal(owner.address);
    expect(project._title).to.equal("title");
    expect(project._balance).to.equal(0);
    expect(project._goal).to.equal(ethers.utils.parseEther("10"));
    expect(project._styling).to.equal("uri");
    expect(project._active).to.equal(true);

    expect(await token.contractURI()).to.equal("uri");
  });

  it("can't create a new project with same title", async function () {
    await expect(
      contract.startProject(
        usdc.address,
        "title",
        ethers.utils.parseEther("10"),
        "uri",
        "https://ethdon.xyz/icons/opensea.png"
      )
    ).to.be.revertedWith("Title already exists");
  });
});

describe("Edit", function () {
  it("not owners can't edit", async function () {
    await expect(
      token.connect(investor).edit(1000, "uri2", "image")
    ).to.be.revertedWith("caller is not the owner");
  });
  it("parameters changed", async function () {
    await token.edit(ethers.utils.parseEther("10000"), "uri3", "image");
    const project = await token.info();
    expect(project._goal).to.equal(ethers.utils.parseEther("10000"));
    expect(project._styling).to.equal("uri3");
    expect(project._image).to.equal("image");
  });
});

describe("Donate", function () {
  it("emits event", async function () {
    await usdc.connect(investor).approve(token.address, donation);
    expect(
      await token.connect(investor).donate(donation, "I like your project!")
    )
      .to.emit(token, "NewDonation")
      .withArgs(investor.address, donation, "I like your project!");
  });
  it("user has less money", async function () {
    expect(await usdc.balanceOf(investor.address)).to.equal(
      userInitialCoinBalance.sub(donation)
    );
  });
  it("contract has more money ", async function () {
    expect(await usdc.balanceOf(token.address)).to.equal(donation);
  });
  it("project balance is correct", async function () {
    expect(await token.balance()).to.equal(donation);
  });
  it("user has NFT ", async function () {
    expect(await token.ownerOf(1)).to.equal(investor.address);
    console.log(await token.tokenURI(1));
  });
});

describe("Cash out", async function () {
  before(async function () {
    await token.cashOut();
  });
  it("owner has more money", async function () {
    const balance = await usdc.balanceOf(owner.address);
    expect(balance).to.equal(donation);
  });
  it("contract has less money ", async function () {
    const balance = await usdc.balanceOf(token.address);
    expect(balance).to.equal(0);
  });
});

describe("End", async function () {
  before(async function () {
    await token.end();
  });

  it("can't donate anymore", async function () {
    await expect(
      token.connect(investor).donate(donation, "Hello")
    ).to.be.revertedWith("Project not active!");
  });
  it("can't edit project anymore", async function () {
    await expect(token.edit(0, "styling", "image")).to.be.revertedWith(
      "Project not active!"
    );
  });
});
