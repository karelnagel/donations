import { NewCollection, SetURI } from "../../generated/Factory/Factory"
import { Collection as CollectionTemplate } from '../../generated/templates'
import { getCollection, getAccount, getCoin, getCollectionAddress } from "../helpers/initializers"
import { getCollectionIpfs } from "../helpers/getCollectionIpfs"

export function handleNewCollection(event: NewCollection): void {
  const address = getCollectionAddress(event.params.collection.toHexString())
  address.collection = event.params.title;
  address.save()

  const collection = getCollection(event.params.title,)
  collection.coin = getCoin(event.params.coin.toHexString()).id
  collection.time = event.block.timestamp
  collection.ipfs = event.params.ipfs
  collection.address = address.id
  collection.owner = getAccount(event.params.sender.toHexString()).id
  collection.save()

  getCollectionIpfs(event.params.title, event.params.ipfs)

  CollectionTemplate.create(event.params.collection)
}

export function handleSetURI(event: SetURI): void {
  // Todo
}
