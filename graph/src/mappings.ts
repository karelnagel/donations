import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { NewCollection, SetURI } from "../generated/Factory/Factory"
import {
  End,
  OwnershipTransferred,
  NewProject,
  NewDonation,
  SetIPFS,
  Transfer
} from "../generated/templates/collection/Collection"
import { Title } from "../generated/schema"
import { Collection as CollectionTemplate } from '../generated/templates'
import { getCollection, getDonation, getGlobal, getProject, getProjectId, getTitle } from "./helpers"
import { getIpfs } from "./ipfs"

function newProject(title: string, coin: Bytes, timestamp: BigInt, owner: string, ipfs: string): void {
  const collection = getCollection(title)
  collection.projectsCount++
  collection.save()

  const big = BigInt.fromString(collection.projectsCount.toString())
  const project = getProject(title, big);
  project.coin = coin;
  project.time = timestamp;
  project.owner = owner;
  project.save()

  getIpfs(title, big, ipfs)

  const global = getGlobal();
  global.projectsCount++;
  global.streamersCount++;// Todo check if already in list
  global.save()
}


export function handleNewCollection(event: NewCollection): void {
  const title = new Title(event.params.collection.toHexString())
  title.collection = event.params.title;
  title.save()

  const collection = getCollection(event.params.title)
  collection.address = event.params.collection
  collection.time = event.block.timestamp
  collection.owner = event.params.owner.toHexString();
  collection.save()

  newProject(event.params.title, event.params.projectCoin, event.block.timestamp, event.params.projectOwner.toHexString(), event.params.projectIpfs)

  CollectionTemplate.create(event.params.collection)

  const global = getGlobal();
  global.collectionsCount++;
  global.save()
}

export function handleSetURI(event: SetURI): void {
  // Todo
}

export function handleNewProject(event: NewProject): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  newProject(title.collection, event.params.coin, event.block.timestamp, event.params.owner.toHexString(), event.params.ipfs)
}


export function handleEnd(event: End): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const project = getProject(title.collection, event.params.id)
  project.active = false;
  project.save()
}


export function handleNewDonation(event: NewDonation): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const project = getProject(title.collection, event.params.projectId)
  project.donated = project.donated.plus(event.params.amount);
  project.donationCount++;
  project.save()

  const donation = getDonation(title.collection, event.params.id.toString())
  donation.amount = event.params.amount
  donation.message = event.params.message;
  donation.owner = event.params.owner.toHexString();
  donation.project = getProjectId(title.collection, event.params.projectId.toString())
  donation.time = event.block.timestamp;
  donation.originalOwner = event.params.owner.toHexString()

  donation.save()

  const global = getGlobal();
  global.donationsCount++;
  global.usersCount++; // Todo check if not already user
  global.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const collection = getCollection(title.collection)
  collection.owner = event.params.newOwner.toHexString();
  collection.save()
}

export function handleSetIPFS(event: SetIPFS): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  getIpfs(title.collection, event.params.id, event.params.ipfs)
}

export function handleTransfer(event: Transfer): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const donation = getDonation(title.collection, event.params.tokenId.toString())
  donation.owner = event.params.to.toHexString();
  donation.save()
}