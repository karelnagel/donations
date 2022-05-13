import { clearStore, test, assert, logStore, mockIpfsFile } from 'matchstick-as/assembly/index'
import { addresses, testCollectionIpfs } from "./helpers"
import { handleNewCollection } from "../src/mappings/factory"
import { NewCollection } from "../generated/Factory/Factory"
import { param, addr, str } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"

function createNewCollectinEvent(sender: string, title: string, coin: string, collection: string, ipfs: string): NewCollection {
  let newCollection = changetype<NewCollection>(newMockEvent())

  newCollection.parameters =
    [param('title', str(title)),
    param('collection', addr(collection)),
    param('coin', addr(coin)),
    param('ipfs', str(ipfs)),
    param("sender", addr(sender))]

  return newCollection
}

test('Create new collection', () => {
  const title = "good title"
  const ipfs = "ipfsFile"
  const coin = addresses[0]
  const collection = addresses[1]
  const sender = addresses[2]
  const event = createNewCollectinEvent(sender, title, coin, collection, ipfs)

  mockIpfsFile(ipfs, 'tests/ipfs/collection.json')
  handleNewCollection(event)
  // logStore()

  assert.fieldEquals("CollectionAddress", collection, "id", collection)
  assert.fieldEquals("CollectionAddress", collection, "collection", title)

  assert.fieldEquals("Collection", title, "id", title)
  assert.fieldEquals("Collection", title, "address", collection)
  assert.fieldEquals("Collection", title, "coin", coin)
  assert.fieldEquals("Collection", title, "ipfs", ipfs)
  assert.fieldEquals("Collection", title, "owner", sender)
  assert.fieldEquals("Collection", title, "donated", "0")
  assert.fieldEquals("Collection", title, "donationsCount", "0")

  testCollectionIpfs(title)

  assert.fieldEquals("Account", sender, "id", sender)

  assert.fieldEquals("Coin", coin, "id", coin)
  assert.fieldEquals("Coin", coin, "donated", "0")
  assert.fieldEquals("Coin", coin, "donationsCount", "0")
  assert.fieldEquals("Coin", coin, "global", "0")

  assert.fieldEquals("Global", "0", "donationsCount", "0")
  assert.fieldEquals("Global", "0", "usersCount", "1")
  assert.fieldEquals("Global", "0", "collectionsCount", "1")
  assert.fieldEquals("Global", "0", "supportersCount", "0")


  clearStore()
})