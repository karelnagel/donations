import { clearStore, test, assert, mockIpfsFile } from 'matchstick-as/assembly/index'
import { createCollection, testCollectionIpfs } from "./helpers"
import { handleSetIPFS } from "../src/mappings/collection"
import { SetIPFS } from "../generated/templates/collection/Collection"
import { param, str } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address } from '@graphprotocol/graph-ts'

function createSetIPFSEvent(address: string, ipfs: string): SetIPFS {
  let event = changetype<SetIPFS>(newMockEvent())

  event.parameters =
    [param('ipfs', str(ipfs))]

  event.address = Address.fromString(address);

  return event
}

test('Set IPFS', () => {
  const ipfs = "This is ipfs hash"

  const collection = createCollection(ipfs)

  const event = createSetIPFSEvent(collection.address, ipfs)

  mockIpfsFile(ipfs, 'tests/ipfs/collection.json')
  handleSetIPFS(event)
  // logStore()

  assert.fieldEquals("Collection", collection.id, "id", collection.id)
  assert.fieldEquals("Collection", collection.id, "ipfs", ipfs)
  testCollectionIpfs(collection.id)

  clearStore()
})
