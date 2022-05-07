import { clearStore, test, assert } from 'matchstick-as/assembly/index'
import { addresses, createCollection } from "./helpers"
import { handleTransfer } from "../src/mappings/collection"
import { Transfer } from "../generated/templates/collection/Collection"
import { param, addr, num } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { getSupporterId } from '../src/helpers/getIds'
import { ZERO_ADDRESS } from '../src/helpers/consts'
import { getDonation, getSupporter } from '../src/helpers/initializers'

function createTransferEvent(address: string, from: string, to: string, tokenId: i32): Transfer {
  let event: Transfer = changetype<Transfer>(newMockEvent())

  event.parameters =
    [param('from', addr(from)),
    param('to', addr(to)),
    param('tokenId', num(tokenId))]

  event.address = Address.fromString(address);

  return event
}

test('Transfer', () => {
  const from = addresses[1]
  const to = addresses[2]
  const tokenId = 1
  const donationAmount = 10000

  const collection = createCollection()

  const oldSupporter = getSupporter(collection.id, from)
  oldSupporter.donated = BigInt.fromI32(donationAmount)
  oldSupporter.donationsCount = 1;
  oldSupporter.save()

  const donation = getDonation(collection.id, tokenId.toString())
  donation.amount = BigInt.fromI32(donationAmount)
  donation.supporter = oldSupporter.id
  donation.save()

  const event = createTransferEvent(collection.address, from, to, tokenId)

  handleTransfer(event)
  // logStore()
  const newSupporterId = getSupporterId(collection.id, to)
  assert.fieldEquals("Donation", donation.id, "id", donation.id)
  assert.fieldEquals("Donation", donation.id, "amount", donationAmount.toString())
  assert.fieldEquals("Donation", donation.id, "supporter", newSupporterId)

  assert.fieldEquals("Supporter", oldSupporter.id, "donated", "0")
  assert.fieldEquals("Supporter", oldSupporter.id, "donationsCount", "0")

  assert.fieldEquals("Supporter", newSupporterId, "donated", donationAmount.toString())
  assert.fieldEquals("Supporter", newSupporterId, "donationsCount", "1")

  assert.fieldEquals("Global", "0", "donationsCount", "1")
  assert.fieldEquals("Global", "0", "usersCount", "2")
  assert.fieldEquals("Global", "0", "collectionsCount", "1")
  assert.fieldEquals("Global", "0", "supportersCount", "2")

  clearStore()
})

test('Only new supporter created when minting', () => {
  const from = ZERO_ADDRESS
  const to = addresses[2]
  const tokenId = 1
  const donationAmount = 10000

  const collection = createCollection()

  const donation = getDonation(collection.id, tokenId.toString())
  donation.amount = BigInt.fromI32(donationAmount)
  donation.save()

  const event = createTransferEvent(collection.address, from, to, tokenId)

  handleTransfer(event)
  // logStore()
  const newSupporterId = getSupporterId(collection.id, to)
  assert.fieldEquals("Donation", donation.id, "id", donation.id)
  assert.fieldEquals("Donation", donation.id, "amount", donationAmount.toString())
  assert.fieldEquals("Donation", donation.id, "supporter", newSupporterId)

  assert.fieldEquals("Supporter", newSupporterId, "donated", donationAmount.toString())
  assert.fieldEquals("Supporter", newSupporterId, "donationsCount", "1")

  assert.fieldEquals("Global", "0", "donationsCount", "1")
  assert.fieldEquals("Global", "0", "usersCount", "1")
  assert.fieldEquals("Global", "0", "collectionsCount", "1")
  assert.fieldEquals("Global", "0", "supportersCount", "1")

  clearStore()
})
