import { clearStore, test, assert, mockIpfsFile } from 'matchstick-as/assembly/index'
import { createCollection } from "./helpers"
import { handleAddContent } from "../src/mappings/collection"
import { AddContent } from "../generated/templates/collection/Collection"
import { param, str } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address } from '@graphprotocol/graph-ts'
import { getContentId } from '../src/helpers/getIds'

function createAddContentEvent(address: string, ipfs: string): AddContent {
  let event = changetype<AddContent>(newMockEvent())

  event.parameters =
    [param('ipfs', str(ipfs))]

  event.address = Address.fromString(address);

  return event
}

test('Add content', () => {
  const ipfs = "This is ipfs hash"
  const collection = createCollection()

  const event = createAddContentEvent(collection.address, ipfs)

  mockIpfsFile(ipfs, 'tests/ipfs/content.json')
  handleAddContent(event)
  // logStore()
  const contentId = getContentId(collection.id, ipfs)
  assert.fieldEquals("Content", contentId, "id", contentId)
  assert.fieldEquals("Content", contentId, "ipfs", ipfs)
  assert.fieldEquals("Content", contentId, "collection", collection.id)
  assert.fieldEquals("Content", contentId, "description", "This is description")
  assert.fieldEquals("Content", contentId, "price", "1230000000000000000000")
  assert.fieldEquals("Content", contentId, "content", "This is content")
  assert.fieldEquals("Content", contentId, "time", event.block.timestamp.toString())

  clearStore()
})
