import { clearStore, test, assert } from 'matchstick-as/assembly/index'
import { addresses, createCollection } from "./helpers"
import { handleOwnershipTransferred } from "../src/mappings/collection"
import { OwnershipTransferred } from "../generated/templates/collection/Collection"
import { param, addr } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address } from '@graphprotocol/graph-ts'
import { ZERO_ADDRESS } from '../src/helpers/consts'

function createOwnershipTransferredEvent(address: string, previousOwner: string, newOwner: string): OwnershipTransferred {
  let newDonation = changetype<OwnershipTransferred>(newMockEvent())

  newDonation.parameters =
    [param('previousOwner', addr(previousOwner)),
    param('newOwner', addr(newOwner))]

  newDonation.address = Address.fromString(address);

  return newDonation
}

test('Ownership transferred', () => {
  const previousOwner = addresses[1]
  const newOwner = addresses[2]

  const collection = createCollection(previousOwner)

  const event = createOwnershipTransferredEvent(collection.address, previousOwner, newOwner)

  handleOwnershipTransferred(event)
  // logStore()

  assert.fieldEquals("CollectionAddress", collection.address, "id", collection.address)
  assert.fieldEquals("CollectionAddress", collection.address, "collection", collection.id)

  assert.fieldEquals("Collection", collection.id, "id", collection.id)
  assert.fieldEquals("Collection", collection.id, "owner", newOwner)

  clearStore()
})

test('Ownership not transferred when from zero address', () => {
  const previousOwner = ZERO_ADDRESS
  const newOwner = addresses[2]

  const collection = createCollection(previousOwner)

  const event = createOwnershipTransferredEvent(collection.address, previousOwner, newOwner)

  handleOwnershipTransferred(event)
  // logStore()

  assert.fieldEquals("CollectionAddress", collection.address, "id", collection.address)
  assert.fieldEquals("CollectionAddress", collection.address, "collection", collection.id)

  assert.fieldEquals("Collection", collection.id, "id", collection.id)
  assert.fieldEquals("Collection", collection.id, "owner", previousOwner)

  clearStore()
})
