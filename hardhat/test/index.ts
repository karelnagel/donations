import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Donations, DonationsToken, USDC } from "../typechain";
let token: DonationsToken;
let contract: Donations;
let usdc: USDC;
let owner: SignerWithAddress;
let investor: SignerWithAddress;
const projectId = 0;
const userInitialCoinBalance = ethers.utils.parseEther("10000");
const donation = ethers.utils.parseEther("100");

before("Start", async function () {
  // Getting accounts
  [owner, investor] = await ethers.getSigners();

  // Deploy token
  const Token = await ethers.getContractFactory("DonationsToken");
  token = await Token.deploy();
  await token.deployed();

  // Deploy token
  const Contract = await ethers.getContractFactory("Donations");
  contract = await Contract.deploy(token.address);
  await contract.deployed();

  // Deploy token
  const USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.connect(investor).deploy();
  await usdc.deployed();

  // Change token owner to Contract
  token.transferOwnership(contract.address);
});

describe("Start project", function () {
  before(async function () {
    await contract.startProject(
      usdc.address,
      "My project",
      ethers.utils.parseEther("10"),
      "styling_uri",
      "token_uri"
    );
  });

  it("has correct parameters", async function () {
    const project = await contract.projects(projectId);
    expect(project.coin).to.equal(usdc.address);
    expect(project.owner).to.equal(owner.address);
    expect(project.title).to.equal("My project");
    expect(project.balance).to.equal(0);
    expect(project.goal).to.equal(ethers.utils.parseEther("10"));
    expect(project.styling).to.equal("styling_uri");
    expect(project.active).to.equal(true);
  });
  it("token has correct uri", async function () {
    const tokenUri = await token.uri(projectId);
    expect(tokenUri).to.equal("token_uri");
  });
});

describe("Edit project", function () {
  it("not owners can't edit", async function () {
    await expect(
      contract.connect(investor).editProject(projectId, 1000, "styling2")
    ).to.be.revertedWith("Not project owner");
  });
  it("parameters changed", async function () {
    await contract.editProject(
      projectId,
      ethers.utils.parseEther("10000"),
      "styling3"
    );
    const project = await contract.projects(projectId);
    expect(project.goal).to.equal(ethers.utils.parseEther("10000"));
    expect(project.styling).to.equal("styling3");
  });
});

describe("Edit project token", function () {
  it("not owners can't edit", async function () {
    await expect(
      contract.connect(investor).editProjectToken(projectId, "token_uri2")
    ).to.be.revertedWith("Not project owner");
  });
  it("token uri changed", async function () {
    await contract.editProjectToken(projectId, "token_uri3");
    const uri = await token.uri(projectId);
    expect(uri).to.equal("token_uri3");
  });
});

describe("Donate", function () {
  it("emits event", async function () {
    await usdc.connect(investor).approve(contract.address, donation);
    expect(
      await contract
        .connect(investor)
        .donate(projectId, donation, "I like your project!")
    )
      .to.emit(contract, "Donation")
      .withArgs(projectId, investor.address, donation, "I like your project!");
  });
  it("user has less money", async function () {
    const balance = await usdc.balanceOf(investor.address);
    expect(balance).to.equal(userInitialCoinBalance.sub(donation));
  });
  it("contract has more money ", async function () {
    const balance = await usdc.balanceOf(contract.address);
    expect(balance).to.equal(donation);
  });
  it("project balance is correct", async function () {
    const project = await contract.projects(projectId);
    expect(project.balance).to.equal(donation);
  });
  it("user has NFT ", async function () {
    const balance = await token.balanceOf(investor.address, projectId);
    expect(balance).to.equal(1);
  });
});

describe("End", async function () {
  before(async function () {
    await contract.endProject(projectId);
  });
  it("project status not active and balance == 0", async function () {
    const project = await contract.projects(projectId);
    expect(project.active).to.equal(false);
    expect(project.balance).to.equal(0);
  });
  it("owner has more money", async function () {
    const balance = await usdc.balanceOf(owner.address);
    expect(balance).to.equal(donation);
  });
  it("contract has less money ", async function () {
    const balance = await usdc.balanceOf(contract.address);
    expect(balance).to.equal(0);
  });
  it("can't donate anymore", async function () {
    await expect(
      contract.connect(investor).donate(projectId, donation, "Hello")
    ).to.be.revertedWith("Project not active!");
  });
  it("can't edit project anymore", async function () {
    await expect(
      contract.editProject(projectId, 0, "styling")
    ).to.be.revertedWith("Project not active!");
  });
  it("can't edit token anymore", async function () {
    await expect(
      contract.editProjectToken(projectId, "uri")
    ).to.be.revertedWith("Project not active!");
  });
});
