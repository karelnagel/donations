import { NewCollection, SetURI } from "../generated/Factory/Factory"
import {
  OwnershipTransferred,
  NewDonation,
  SetIPFS,
  Transfer
} from "../generated/templates/collection/Collection"
import { Title } from "../generated/schema"
import { Collection as CollectionTemplate } from '../generated/templates'
import { getCollection, getDonation, getTitle, getAccount, getSupporter, getCoin } from "./helpers"
import { getIpfs } from "./ipfs"

export function handleNewCollection(event: NewCollection): void {
  const title = new Title(event.params.collection.toHexString())
  title.collection = event.params.title;
  title.save()

  const collection = getCollection(event.params.title)
  collection.address = event.params.collection
  collection.coin = getCoin(event.params.coin.toHexString()).id
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

  const collection = getCollection(title.collection)
  collection.donated = collection.donated.plus(event.params.amount);
  collection.donationsCount++;
  collection.save()

  const account = getAccount(event.params.owner.toHexString())

  const supporter = getSupporter(title.collection, account.id)
  supporter.donated = supporter.donated.plus(event.params.amount)
  supporter.donationsCount++
  supporter.save()

  const donation = getDonation(title.collection, event.params.id.toString())
  donation.amount = event.params.amount
  donation.message = event.params.message;
  donation.donator = account.id
  donation.collection = title.collection
  donation.supporter = supporter.id
  donation.time = event.block.timestamp;
  donation.save()

  const coin = getCoin(collection.coin)
  coin.donationsCount++;
  coin.donated = coin.donated.plus(event.params.amount)
  coin.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  if (event.params.previousOwner.toHexString() == "0x0000000000000000000000000000000000000000") return // First ownership transfre not needed

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
  if (event.params.from.toHexString() == "0x0000000000000000000000000000000000000000") return // If minting the token then no need to change supporters

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