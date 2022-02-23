import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Donations, USDC } from "../typechain";
let contract: Donations;
let usdc: USDC;
let owner: SignerWithAddress;
let investor: SignerWithAddress;
const projectId = 1;
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
        "my_project",
        ethers.utils.parseEther("10"),
        "uri"
      )
    )
      .to.emit(contract, "NewProject")
      .withArgs(projectId, "my_project", owner.address);
  });

  it("has correct title mapping", async function () {
    const id = await contract.titles("my_project");
    expect(id).to.equal(projectId);
  });
  // Todo test starting with same name
  it("has correct parameters", async function () {
    const project = await contract.projects(projectId);
    expect(project.coin).to.equal(usdc.address);
    expect(project.owner).to.equal(owner.address);
    expect(project.title).to.equal("my_project");
    expect(project.balance).to.equal(0);
    expect(project.goal).to.equal(ethers.utils.parseEther("10"));
    expect(project.uri).to.equal("uri");
    expect(project.active).to.equal(true);
  });
  it("token has correct uri", async function () {
    const tokenUri = await contract.uri(projectId);
    expect(tokenUri).to.equal("uri");
  });
  it("can't create a new project with same title", async function () {
    await expect(
      contract.startProject(
        usdc.address,
        "my_project",
        ethers.utils.parseEther("10"),
        "uri"
      )
    ).to.be.revertedWith("Title already exists");
  });
});

describe("Edit project", function () {
  it("not owners can't edit", async function () {
    await expect(
      contract.connect(investor).editProject(projectId, 1000, "uri2")
    ).to.be.revertedWith("Not project owner");
  });
  it("parameters changed", async function () {
    await contract.editProject(
      projectId,
      ethers.utils.parseEther("10000"),
      "uri3"
    );
    const project = await contract.projects(projectId);
    expect(project.goal).to.equal(ethers.utils.parseEther("10000"));
    expect(project.uri).to.equal("uri3");

    const uri = await contract.uri(projectId);
    expect(uri).to.equal("uri3");
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
    const balance = await contract.balanceOf(investor.address, projectId);
    expect(balance).to.equal(1);
  });
});

describe("Change owner", function () {
  it("changing from owner to investor", async function () {
    await contract.changeProjectOwner(projectId, investor.address);
    expect(investor.address).to.equal(
      (await contract.projects(projectId)).owner
    );
  });
  it("changing from investor to owner", async function () {
    await contract
      .connect(investor)
      .changeProjectOwner(projectId, owner.address);
    expect(owner.address).to.equal((await contract.projects(projectId)).owner);
  });
});

describe("End", async function () {
  before(async function () {
    await contract.endProject(projectId);
  });
  it("project status not active but balance still same", async function () {
    const project = await contract.projects(projectId);
    expect(project.active).to.equal(false);
    expect(project.balance).to.equal(donation);
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
});
