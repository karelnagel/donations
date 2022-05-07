import {
  OwnershipTransferred,
  NewDonation,
  SetIPFS,
  Transfer
} from "../../generated/templates/collection/Collection"
import { ZERO_ADDRESS } from "../helpers/consts"
import { getDonation, getCollectionAddress, getAccount, getSupporter, getCoin, getCollectionByAddress } from "../helpers/initializers"
import { getIpfs } from "../helpers/ipfs"

export function handleNewDonation(event: NewDonation): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  collection.donated = collection.donated.plus(event.params.amount);
  collection.donationsCount++;
  collection.save()

  const account = getAccount(event.params.sender.toHexString())

  const donation = getDonation(collection.id, event.params.id.toString())
  donation.amount = event.params.amount
  donation.message = event.params.message;
  donation.donator = account.id
  donation.supporter = getSupporter(collection.id, account.id).id
  donation.time = event.block.timestamp;
  donation.save()

  const coin = getCoin(collection.coin)
  coin.donationsCount++;
  coin.donated = coin.donated.plus(event.params.amount)
  coin.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  if (event.params.previousOwner.toHexString() == ZERO_ADDRESS) return // First ownership transfer is to the factory contract

  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  collection.owner = getAccount(event.params.newOwner.toHexString()).id;
  collection.save()
}

export function handleSetIPFS(event: SetIPFS): void {
  const title = getCollectionAddress(event.address.toHexString())
  if (!title) return;

  getIpfs(title.collection, event.params.ipfs)
}

export function handleTransfer(event: Transfer): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  const donation = getDonation(collection.id, event.params.tokenId.toString())

  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    const oldSupporter = getSupporter(collection.id, event.params.from.toHexString())
    oldSupporter.donated = oldSupporter.donated.minus(donation.amount)
    oldSupporter.donationsCount--
    oldSupporter.save()
  }

  const newSupporter = getSupporter(collection.id, event.params.to.toHexString())
  newSupporter.donated = newSupporter.donated.plus(donation.amount)
  newSupporter.donationsCount++
  newSupporter.save()

  donation.supporter = newSupporter.id
  donation.save()
}