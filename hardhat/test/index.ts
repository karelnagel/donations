import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";
import { USDC, Collection } from "../typechain";

let factory: any;
let collection: Collection;
let usdc: USDC;

let acc1: SignerWithAddress;
let acc2: SignerWithAddress;
let acc3: SignerWithAddress;

const donation = ethers.utils.parseEther("100");
const url = "https://streamint.xyz/api/tokens/";

before("Start", async function () {
  // Getting accounts
  [acc1, acc2, acc3] = await ethers.getSigners();

  // Deploy contract
  const Factory = await ethers.getContractFactory("Factory");
  factory = await upgrades.deployProxy(Factory, [url], { kind: "uups" });
  await factory.deployed();

  // Deploy usdc
  const USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.connect(acc3).deploy();
  await usdc.deployed();
});

describe("Start collection", function () {
  it("emits an event", async function () {
    expect(
      await factory.newCollection(
        "my_collection",
        usdc.address,
        "my_project_ipfs"
      )
    )
      .to.emit(factory, "NewCollection")
      .withArgs(
        "my_collection",
        "0xCafac3dD18aC6c6e92c921884f9E4176737C052c",
        acc1.address,
        "0x663F3ad617193148711d28f5334eE4Ed07016602",
        "my_project_ipfs"
      );
  });

  it("has correct parameters", async function () {
    const collectionAddress = await factory.collections("my_collection");

    const Collection = await ethers.getContractFactory("Collection");
    collection = Collection.attach(collectionAddress);

    expect(await collection.title()).to.equal("my_collection");
    expect(await collection.coin()).to.equal(usdc.address);
    expect(await collection.ipfs()).to.equal("my_project_ipfs");
    expect(await collection.owner()).to.equal(acc1.address);
    expect(await collection.tokenURI(1)).to.equal(`${url}my_collection/1`);
    expect(await collection.contractURI()).to.equal(`${url}my_collection`);
  });

  it("can't create a new project with same title", async function () {
    await expect(
      factory.newCollection("my_collection", usdc.address, "my_project2_ipfs")
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
    const uri2 = "https://twitter.com/";
    await expect(factory.setURI(uri2))
      .to.emit(factory, "SetURI")
      .withArgs(uri2);
    expect(await factory.getContractURI("title")).to.equal(`${uri2}title`);
    expect(await factory.getTokenURI("title", 5)).to.equal(`${uri2}title/5`);
    expect(await collection.tokenURI(1)).to.equal(uri2 + "my_collection/1");
    expect(await collection.contractURI()).to.equal(uri2 + "my_collection");
  });
});

describe("Edit project ipfs", function () {
  const ipfs2 = "my_project_ipfs2";
  it("not owners can't edit", async function () {
    await expect(collection.connect(acc2).setIPFS(ipfs2)).to.be.revertedWith(
      "caller is not the owner"
    );
  });
  it("parameters changed", async function () {
    await expect(collection.setIPFS(ipfs2))
      .to.emit(collection, "SetIPFS")
      .withArgs(ipfs2);
    expect(await collection.ipfs()).to.equal(ipfs2);
  });
});

const Donate = (id: number) => {
  describe(`Donation #${id}`, function () {
    let senderBalance: BigNumber;
    let receiverBalance: BigNumber;

    const message = `I like your project ${id}`;
    before(async function () {
      senderBalance = await usdc.balanceOf(acc3.address);
      receiverBalance = await usdc.balanceOf(acc1.address);
    });

    it("fails if amount == 0", async function () {
      await expect(
        collection.connect(acc3).donate(0, message)
      ).to.be.revertedWith("Donation amount is 0");
    });

    it("fails if not allowed", async function () {
      await expect(collection.donate(donation, message)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("successful donation", async function () {
      await usdc.connect(acc3).approve(collection.address, donation);
      expect(await collection.connect(acc3).donate(donation, message))
        .to.emit(collection, "NewDonation")
        .withArgs(id.toString(), acc3.address, donation, message);

      // donator has less money
      expect(await usdc.balanceOf(acc3.address)).to.equal(
        senderBalance.sub(donation)
      );

      // owner has more money
      expect(await usdc.balanceOf(acc1.address)).to.equal(
        receiverBalance.add(donation)
      );

      // donator has NFT
      expect(await collection.ownerOf(id)).to.equal(acc3.address);
    });
  });
};
Donate(1);
Donate(2);
Donate(3);
