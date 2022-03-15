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

    expect(project.coin).to.equal(usdc.address);
    expect(project.currentOwner).to.equal(owner.address);
    expect(project.title).to.equal("title");
    expect(project.balance).to.equal(0);
    expect(project.goal).to.equal(ethers.utils.parseEther("10"));
    expect(project.styling).to.equal("uri");
    expect(project.active).to.equal(true);
    expect(project.donationsCount).to.equal(0);

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
    expect(project.goal).to.equal(ethers.utils.parseEther("10000"));
    expect(project.styling).to.equal("uri3");
    expect(project.image).to.equal("image");
  });
});

describe("Donate", function () {
  it("fails if amount == 0", async function () {
    await expect(
      token.connect(investor).donate(0, "I like your project!")
    ).to.be.revertedWith("Donation amount is 0");
  });

  it("fails if not enough coins", async function () {
    await expect(
      token.donate(donation, "I like your project!")
    ).to.be.revertedWith("transfer amount exceeds balance");
  });

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
    expect((await token.info()).balance).to.equal(donation);
  });
  it("user has NFT ", async function () {
    expect(await token.ownerOf(1)).to.equal(investor.address);
  });
  it("token has correct uri ", async function () {
    const result = await token.tokenURI(1);
    const json = atob(result.split(",")[1]);
    const obj = JSON.parse(json);

    const donationInfo = await token.donations(1);

    expect(obj.image).to.equal("image");
    expect(obj.name).to.equal("Supporter #1");
    expect(obj.description).to.equal("I like your project!");
    expect(obj.external_url).to.equal("https://ethdon.xyz/#/title");
    expect(obj.attributes[0].value.toString())
      .to.equal(donationInfo.amount.toString())
      .to.equal(donation.toString());
    expect(obj.attributes[1].value)
      .to.equal(donationInfo.message)
      .to.equal("I like your project!");
    expect(obj.attributes[2].value)
      .to.equal(investor.address.toLowerCase())
      .to.equal("0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
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
