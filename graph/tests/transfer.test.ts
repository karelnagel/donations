import { clearStore, test, assert } from 'matchstick-as/assembly/index'
import { addresses, createCollection } from "./helpers"
import { handleTransfer } from "../src/mappings/collection"
import { Transfer } from "../generated/templates/collection/Collection"
import { param, addr, num } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { getSupporterId } from '../src/helpers/getIds'
import { ZERO_ADDRESS } from '../src/helpers/consts'
import { getAnswer, getDonation, getQuestion, getSupporter, getVote } from '../src/helpers/initializers'

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
  collection.questionsCount = 1;
  collection.save()

  const oldSupporter = getSupporter(collection.id, from)
  oldSupporter.donated = BigInt.fromI32(donationAmount)
  oldSupporter.donationsCount = 1;
  oldSupporter.save()

  const question = getQuestion(collection.id, "1")
  question.endTime = BigInt.fromI32(10000)
  question.votesCount = 2;
  question.votesAmount = BigInt.fromI32(donationAmount)
  question.save()

  // Old owner has voted for answer 0
  const answer0 = getAnswer(collection.id, question.index.toString(), "0")
  answer0.votesCount = 1
  answer0.votesAmount = BigInt.fromI32(donationAmount)
  answer0.save()

  const oldVote = getVote(collection.id, question.index.toString(), from)
  oldVote.answer = answer0.id;
  oldVote.save()

  //New owner has voted for answer 1 but has no tokens
  const answer1 = getAnswer(collection.id, question.index.toString(), "1")
  answer1.votesCount = 1;
  answer1.save()

  const newVote = getVote(collection.id, question.index.toString(), to)
  newVote.answer = answer1.id
  newVote.save()

  // Donation
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

  assert.fieldEquals("Question", question.id, "votesCount", "2")
  assert.fieldEquals("Question", question.id, "votesAmount", donationAmount.toString())

  assert.fieldEquals("Answer", answer0.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer0.id, "votesAmount", "0")

  assert.fieldEquals("Answer", answer1.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer1.id, "votesAmount", donationAmount.toString())

  assert.fieldEquals("Global", "0", "donationsCount", "1")
  assert.fieldEquals("Global", "0", "usersCount", "2")
  assert.fieldEquals("Global", "0", "collectionsCount", "1")
  assert.fieldEquals("Global", "0", "supportersCount", "2")

  clearStore()
})

test('Transfer', () => {
  const from = addresses[1]
  const to = addresses[2]
  const tokenId = 1
  const donationAmount = 10000

  const collection = createCollection()
  collection.questionsCount = 1;
  collection.save()

  const oldSupporter = getSupporter(collection.id, from)
  oldSupporter.donated = BigInt.fromI32(donationAmount)
  oldSupporter.donationsCount = 1;
  oldSupporter.save()

  const question = getQuestion(collection.id, "1")
  question.endTime = BigInt.fromI32(0)
  question.votesCount = 2;
  question.votesAmount = BigInt.fromI32(donationAmount)
  question.save()

  // Old owner has voted for answer 0
  const answer0 = getAnswer(collection.id, question.index.toString(), "0")
  answer0.votesCount = 1
  answer0.votesAmount = BigInt.fromI32(donationAmount)
  answer0.save()

  const oldVote = getVote(collection.id, question.index.toString(), from)
  oldVote.answer = answer0.id;
  oldVote.save()

  //New owner has voted for answer 1 but has no tokens
  const answer1 = getAnswer(collection.id, question.index.toString(), "1")
  answer1.votesCount = 1;
  answer1.save()

  const newVote = getVote(collection.id, question.index.toString(), to)
  newVote.answer = answer1.id
  newVote.save()

  // Donation
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

  assert.fieldEquals("Question", question.id, "votesCount", "2")
  assert.fieldEquals("Question", question.id, "votesAmount", donationAmount.toString())

  assert.fieldEquals("Answer", answer0.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer0.id, "votesAmount", donationAmount.toString())

  assert.fieldEquals("Answer", answer1.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer1.id, "votesAmount", "0")

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
