import { BigNumber } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Factory, USDC, Token } from "../typechain";

let factory: Factory;
let token: Token;
let usdc: USDC;

let acc1: SignerWithAddress;
let acc2: SignerWithAddress;
let acc3: SignerWithAddress;

const donation = ethers.utils.parseEther("100");

before("Start", async function () {
  // Getting accounts
  [acc1, acc2, acc3] = await ethers.getSigners();

  // Deploy contract
  const Contract = await ethers.getContractFactory("Factory");
  factory = await Contract.deploy();
  await factory.deployed();

  // Deploy usdc
  const USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.connect(acc3).deploy();
  await usdc.deployed();
});

describe("Start project", function () {
  it("emits an event", async function () {
    expect(await factory.newToken("title", usdc.address, acc2.address))
      .to.emit(factory, "NewToken")
      .withArgs(
        "title",
        "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be",
        acc1.address,
        "0x663F3ad617193148711d28f5334eE4Ed07016602",
        acc2.address
      );
  });

  it("has correct parameters", async function () {
    const tokenAddress = await factory.tokens("title");

    const Token = await ethers.getContractFactory("Token");
    token = Token.attach(tokenAddress);

    expect(await token.title()).to.equal("title");
    expect(await token.owner()).to.equal(acc1.address);
    expect(await token.tokenURI(1)).to.equal(
      "https://ethdon.xyz/api/tokens/title/1"
    );
    expect(await token.contractURI()).to.equal(
      "https://ethdon.xyz/api/tokens/title"
    );

    const project = await token.projects(1);
    expect(project.coin).to.equal(usdc.address);
    expect(project.donated).to.equal(0);
    expect(project.active).to.equal(true);
    expect(project.owner).to.equal(acc2.address);
  });

  it("can't create a new project with same title", async function () {
    await expect(
      factory.newToken("title", usdc.address, acc2.address)
    ).to.be.revertedWith("Title already exists");
  });
});

describe("Edit uri", function () {
  it("not owners can't edit", async function () {
    await expect(
      factory.connect(acc2).setURI("https://facebook.com/")
    ).to.be.revertedWith("caller is not the owner");
  });
  it("parameters changed", async function () {
    const uri = "https://twitter.com/";
    await expect(factory.setURI(uri)).to.emit(factory, "SetURI").withArgs(uri);
    expect(await factory.getURI()).to.equal(uri);
    expect(await token.tokenURI(1)).to.equal(uri + "title/1");
    expect(await token.contractURI()).to.equal(uri + "title");
  });
});

const Donate = (id: number, projectId: number) => {
  describe(`Donation #${id}`, function () {
    let userBalance: BigNumber;
    let tokenBalance: BigNumber;
    let projectDonated: BigNumber;

    const message = `I like your project ${id}`;
    before(async function () {
      userBalance = await usdc.balanceOf(acc3.address);
      tokenBalance = await usdc.balanceOf(token.address);
      projectDonated = (await token.projects(projectId)).donated;
    });

    it("fails if amount == 0", async function () {
      await expect(
        token.connect(acc3).donate(projectId, 0, message)
      ).to.be.revertedWith("Donation amount is 0");
    });

    it("fails if not enough coins", async function () {
      await expect(
        token.donate(projectId, donation, message)
      ).to.be.revertedWith("transfer amount exceeds balance");
    });

    it("successful donation", async function () {
      await usdc.connect(acc3).approve(token.address, donation);
      expect(await token.connect(acc3).donate(projectId, donation, message))
        .to.emit(token, "NewDonation")
        .withArgs(
          id.toString(),
          projectId.toString(),
          acc3.address,
          donation,
          message
        );

      // donator has less money
      expect(await usdc.balanceOf(acc3.address)).to.equal(
        userBalance.sub(donation)
      );

      // contract has more money
      expect(await usdc.balanceOf(token.address)).to.equal(
        tokenBalance.add(donation)
      );

      // project donations correct
      expect((await token.projects(projectId)).donated).to.equal(
        projectDonated.add(donation)
      );

      // donator has NFT
      expect(await token.ownerOf(id)).to.equal(acc3.address);
    });
  });
};
Donate(1, 1);

describe("New project", async function () {
  it("emits event", async function () {
    expect(await token.newProject(usdc.address, acc2.address))
      .to.emit(token, "NewProject")
      .withArgs(2, usdc.address, acc2.address);
  });
  it("has correct params", async function () {
    const project = await token.projects(2);
    expect(project.donated).to.equal(0);
    expect(project.owner).to.equal(acc2.address);
    expect(project.coin).to.equal(usdc.address);
    expect(project.active).to.equal(true);
  });
});

Donate(2, 2);
Donate(3, 2);
Donate(4, 1);

describe("acc2 ending project 1", async function () {
  const id = 1;
  let userBalance: BigNumber;
  let tokenBalance: BigNumber;

  before(async function () {
    userBalance = await usdc.balanceOf(acc2.address);
    tokenBalance = await usdc.balanceOf(token.address);
  });

  it("acc3 cant end", async function () {
    expect(token.connect(acc3).end(id)).to.be.revertedWith("Not project owner");
  });
  it("success", async function () {
    expect(await token.connect(acc2).end(id))
      .to.emit(token, "End")
      .withArgs(id);
  });
  it("cant end again", async function () {
    expect(token.connect(acc1).end(id)).to.be.revertedWith(
      "Project not active!"
    );
  });

  it("can't donate anymore", async function () {
    await expect(token.donate(id, donation, "Hello")).to.be.revertedWith(
      "Project not active!"
    );
  });
  it("acc2 got the money", async function () {
    const moneySpent = donation.mul(2);
    expect(await usdc.balanceOf(acc2.address)).to.equal(
      userBalance.add(moneySpent)
    );
    expect(await usdc.balanceOf(token.address)).to.equal(tokenBalance.sub(moneySpent)
    );
  });
});

Donate(5, 2);

describe("acc1 ending project 2", async function () {
  const id = 2;
  let userBalance: BigNumber;

  before(async function () {
    userBalance = await usdc.balanceOf(acc2.address);
  });

  it("acc3 cant end", async function () {
    expect(token.connect(acc3).end(id)).to.be.revertedWith("Not project owner");
  });
  it("success", async function () {
    expect(await token.connect(acc1).end(id))
      .to.emit(token, "End")
      .withArgs(id);
  });
  it("cant end again", async function () {
    expect(token.connect(acc1).end(id)).to.be.revertedWith(
      "Project not active!"
    );
  });

  it("can't donate anymore", async function () {
    await expect(token.donate(id, donation, "Hello")).to.be.revertedWith(
      "Project not active!"
    );
  });
  it("acc2 got the money", async function () {
    const moneySpent = donation.mul(3);
    expect(await usdc.balanceOf(acc2.address)).to.equal(
      userBalance.add(moneySpent)
    );
    expect(await usdc.balanceOf(token.address)).to.equal(0);
  });
});
