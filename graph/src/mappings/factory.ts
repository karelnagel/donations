import { NewCollection, SetURI } from "../../generated/Factory/Factory"
import { Title } from "../../generated/schema"
import { Collection as CollectionTemplate } from '../../generated/templates'
import { getCollection, getAccount, getCoin } from "../helpers/initializers"
import { getIpfs } from "../helpers/ipfs"

export function handleNewCollection(event: NewCollection): void {
  const title = new Title(event.params.collection.toHexString())
  title.collection = event.params.title;
  title.save()

  const collection = getCollection(event.params.title)
  collection.address = event.params.collection
  collection.coin = getCoin(event.params.coin.toHexString()).id
  collection.time = event.block.timestamp
  collection.ipfs = event.params.ipfs
  collection.owner = getAccount(event.params.sender.toHexString()).id
  collection.save()

  getIpfs(event.params.title, event.params.ipfs)

  CollectionTemplate.create(event.params.collection)
}

export function handleSetURI(event: SetURI): void {
  // Todo
}
