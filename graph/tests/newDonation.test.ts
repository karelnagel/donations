import { clearStore, test, assert, logStore, mockIpfsFile } from 'matchstick-as/assembly/index'
import { addresses, createCollection } from "./helpers"
import { handleNewDonation } from "../src/mappings/collection"
import { NewDonation } from "../generated/templates/collection/Collection"
import { param, addr, str, num } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address } from '@graphprotocol/graph-ts'
import { getDonationId, getSupporterId } from '../src/helpers/getIds'

function createNewDonationEvent(id: i32, amount: i32, message: string, sender: string, address: string): NewDonation {
  let newDonation = changetype<NewDonation>(newMockEvent())

  newDonation.parameters =
    [param('id', num(id)),
    param('amount', num(amount)),
    param('message', str(message)),
    param("sender", addr(sender))]

  newDonation.address = Address.fromString(address);

  return newDonation
}

test('New donation', () => {
  const id = 1
  const amount = 1000
  const message = "This is message"
  const sender = addresses[0]

  const collection = createCollection()

  const event = createNewDonationEvent(id, amount, message, sender, collection.address)

  handleNewDonation(event)
  // logStore()

  assert.fieldEquals("CollectionAddress", collection.address, "id", collection.address)
  assert.fieldEquals("CollectionAddress", collection.address, "collection", collection.id)

  assert.fieldEquals("Collection", collection.id, "donated", amount.toString())
  assert.fieldEquals("Collection", collection.id, "donationsCount", "1")

  assert.fieldEquals("Account", sender, "id", sender)

  const supporterId = getSupporterId(collection.id, sender)
  assert.fieldEquals("Supporter", supporterId, "id", supporterId)
  assert.fieldEquals("Supporter", supporterId, "collection", collection.id)
  assert.fieldEquals("Supporter", supporterId, "account", sender)

  const donationId = getDonationId(collection.id, id.toString())
  assert.fieldEquals("Donation", donationId, "id", donationId)
  assert.fieldEquals("Donation", donationId, "message", message)
  assert.fieldEquals("Donation", donationId, "amount", amount.toString())
  assert.fieldEquals("Donation", donationId, "donator", sender)
  assert.fieldEquals("Donation", donationId, "supporter", supporterId)
  assert.fieldEquals("Donation", donationId, "time", event.block.timestamp.toString())
  assert.fieldEquals("Donation", donationId, "tokenId", id.toString())
  assert.fieldEquals("Donation", donationId, "collection", collection.id)

  assert.fieldEquals("Coin", collection.coin, "donated", amount.toString())
  assert.fieldEquals("Coin", collection.coin, "donationsCount", "1")

  assert.fieldEquals("Global", "0", "donationsCount", "1")
  assert.fieldEquals("Global", "0", "usersCount", "2")
  assert.fieldEquals("Global", "0", "collectionsCount", "1")
  assert.fieldEquals("Global", "0", "supportersCount", "1")

  clearStore()
})
