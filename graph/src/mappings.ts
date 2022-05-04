import { NewCollection, SetURI } from "../generated/Factory/Factory"
import {
  OwnershipTransferred,
  NewDonation,
  SetIPFS,
  Transfer
} from "../generated/templates/collection/Collection"
import { Title } from "../generated/schema"
import { Collection as CollectionTemplate } from '../generated/templates'
import { getCollection, getDonation, updateGlobal, getTitle, getAccount, getSupporter } from "./helpers"
import { getIpfs } from "./ipfs"

export function handleNewCollection(event: NewCollection): void {
  const title = new Title(event.params.collection.toHexString())
  title.collection = event.params.title;
  title.save()

  const collection = getCollection(event.params.title)
  collection.address = event.params.collection
  collection.coin = event.params.coin
  collection.time = event.block.timestamp
  collection.owner = getAccount(event.params.owner.toHexString()).id
  collection.save()

  getIpfs(event.params.title, event.params.ipfs)

  CollectionTemplate.create(event.params.collection)
}

export function handleSetURI(event: SetURI): void {
  // Todo
}

export function handleNewDonation(event: NewDonation): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const project = getCollection(title.collection)
  project.donated = project.donated.plus(event.params.amount);
  project.donationsCount++;
  project.save()

  const account = getAccount(event.params.owner.toHexString())

  const supporter = getSupporter(title.collection, account.id)
  supporter.donated = supporter.donated.plus(event.params.amount)
  supporter.donationsCount++
  supporter.donated = supporter.donated.plus(event.params.amount)
  supporter.save()

  const donation = getDonation(title.collection, event.params.id.toString())
  donation.amount = event.params.amount
  donation.message = event.params.message;
  donation.donator = account.id
  donation.collection = title.collection
  donation.supporter = supporter.id
  donation.time = event.block.timestamp;
  donation.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const collection = getCollection(title.collection)
  collection.owner = getAccount(event.params.newOwner.toHexString()).id;
  collection.save()
}

export function handleSetIPFS(event: SetIPFS): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  getIpfs(title.collection, event.params.ipfs)
}

export function handleTransfer(event: Transfer): void {
  const title = getTitle(event.address.toHexString())
  if (!title) return;

  const donation = getDonation(title.collection, event.params.tokenId.toString())

  const oldSupporter = getSupporter(title.collection, event.params.from.toHexString())
  oldSupporter.donated = oldSupporter.donated.minus(donation.amount)
  oldSupporter.donationsCount--
  oldSupporter.save()

  const newSupporter = getSupporter(title.collection, event.params.to.toHexString())
  newSupporter.donated = newSupporter.donated.plus(donation.amount)
  newSupporter.donationsCount++
  newSupporter.save()

  donation.supporter = newSupporter.id
  donation.save()
}