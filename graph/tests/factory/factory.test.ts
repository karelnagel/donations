import { clearStore, test, assert, logStore, mockIpfsFile } from 'matchstick-as/assembly/index'
import { addresses } from "../helpers"
import { createNewCollectinEvent } from './utils';
import { handleNewCollection } from "../../src/mappings/factory"

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

  assert.fieldEquals("Title", collection, "id", collection)
  assert.fieldEquals("Title", collection, "collection", title)

  assert.fieldEquals("Collection", title, "id", title)
  assert.fieldEquals("Collection", title, "address", collection)
  assert.fieldEquals("Collection", title, "coin", coin)
  assert.fieldEquals("Collection", title, "ipfs", ipfs)
  assert.fieldEquals("Collection", title, "owner", sender)
  assert.fieldEquals("Collection", title, "donated", "0")
  assert.fieldEquals("Collection", title, "donationsCount", "0")

  assert.fieldEquals("Collection", title, "name", "This is name")
  assert.fieldEquals("Collection", title, "description", "This is description")
  assert.fieldEquals("Collection", title, "image", "This is image")
  assert.fieldEquals("Collection", title, "background", "This is background")
  assert.fieldEquals("Collection", title, "goal", "1230000000000000000000")
  assert.fieldEquals("Collection", title, "url", "This is url")
  assert.fieldEquals("Collection", title, "socials", "[https://twitter.com, https://facbook.com, , a]")
  assert.fieldEquals("Collection", title, "donationOptions", "[10000000000000000000, 20000000000000000000, 30000000000000000000]")
 
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

test('Next test', () => {
  //...
})