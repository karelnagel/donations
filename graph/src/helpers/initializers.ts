import { BigInt } from "@graphprotocol/graph-ts"
import { Collection, Donation, Content, CollectionAddress, Global, Account, Supporter, Coin, Question, Answer, Vote } from "../../generated/schema"
import { getAnswerId, getContentId, getDonationId, getQuestionId, getSupporterId, getVoteId } from "./getIds"

export function getGlobal(): Global {
    let global = Global.load("0");
    if (!global) {
        global = new Global("0");

        global.donationsCount = 0
        global.collectionsCount = 0
        global.usersCount = 0
        global.supportersCount = 0
        global.save()
    }
    return global
}

enum Update {
    donation,
    collection,
    user,
    supporter
}
export function updateGlobal(update: Update): void {
    const global = getGlobal()

    if (update === Update.donation) global.donationsCount++
    if (update === Update.collection) global.collectionsCount++
    if (update === Update.user) global.usersCount++
    if (update === Update.supporter) global.supportersCount++

    global.save()
}

export function getCollectionAddress(address: string): CollectionAddress {
    let collectionAddress = CollectionAddress.load(address)
    if (!collectionAddress) {
        collectionAddress = new CollectionAddress(address)
        collectionAddress.save()
    }
    return collectionAddress
}

export function getCollectionByAddress(address: string): Collection | null {
    const title = getCollectionAddress(address)
    if (!title) return null

    return getCollection(title.collection)
}


export function getCollection(title: string): Collection {
    let collection = Collection.load(title);
    if (!collection) {
        updateGlobal(Update.collection)
        collection = new Collection(title);
        collection.time = BigInt.fromU64(0)
        collection.donated = BigInt.fromU64(0)
        collection.donationsCount = 0;
        collection.questionsCount = 0;
        collection.ipfs = ""

        collection.name = ""
        collection.description = ""
        collection.image = ""
        collection.background = ""
        collection.goal = "0"
        collection.url = ""
        collection.socials = []
        collection.donationOptions = []

        collection.save()
    }
    return collection
}

export function getDonation(title: string, id: string): Donation {
    const donationId = getDonationId(title, id)
    let donation = Donation.load(donationId);
    if (!donation) {
        updateGlobal(Update.donation)
        donation = new Donation(donationId);
        donation.amount = BigInt.fromU64(0)
        donation.message = ""
        donation.tokenId = id
        donation.collection = title
        donation.time = BigInt.fromU64(0)

        donation.save()
    }
    return donation
}

export function getAccount(address: string): Account {
    let account = Account.load(address);
    if (!account) {
        updateGlobal(Update.user)
        account = new Account(address);
        account.save()
    }
    return account
}

export function getSupporter(title: string, address: string): Supporter {
    let supporter = Supporter.load(getSupporterId(title, address));
    if (!supporter) {
        updateGlobal(Update.supporter)
        supporter = new Supporter(getSupporterId(title, address));
        supporter.collection = title
        supporter.account = getAccount(address).id
        supporter.donated = BigInt.fromI32(0)
        supporter.donationsCount = 0

        supporter.save()
    }
    return supporter
}

export function getCoin(address: string): Coin {
    let coin = Coin.load(address);
    if (!coin) {
        coin = new Coin(address);
        coin.global = getGlobal().id
        coin.donated = BigInt.fromU64(0)
        coin.donationsCount = 0

        coin.save()
    }
    return coin
}

export function getContent(title: string, ipfs: string): Content {
    const contentId = getContentId(title, ipfs)
    let content = Content.load(contentId);
    if (!content) {
        content = new Content(contentId);
        content.ipfs = ipfs
        content.collection = title
        content.save()
    }
    return content
}

export function getQuestion(title: string, index: string): Question {
    const questionId = getQuestionId(title, index)
    let question = Question.load(questionId);
    if (!question) {
        question = new Question(questionId);
        question.ipfs = ""
        question.collection = title
        question.index = BigInt.fromString(index)
        question.endTime = BigInt.fromI32(0)
        question.question = ""
        question.votesCount = 0
        question.votesAmount = BigInt.fromI32(0)
        question.save()
    }
    return question
}

export function getAnswer(title: string, questionId: string, index: string): Answer {
    const answerId = getAnswerId(title, questionId, index)
    let answer = Answer.load(answerId);
    if (!answer) {
        answer = new Answer(answerId);
        answer.question = getQuestion(title, questionId).id
        answer.index = BigInt.fromString(index)
        answer.answer = ""
        answer.votesCount = 0
        answer.votesAmount = BigInt.fromI32(0)

        answer.save()
    }
    return answer
}

export function getVote(title: string, questionId: string, account: string): Vote {
    const voteId = getVoteId(title, questionId, account)
    let vote = Vote.load(voteId);
    if (!vote) {
        vote = new Vote(voteId);
        vote.question = getQuestion(title, questionId).id
        vote.supporter = getSupporter(title, account).id
        vote.save()
    }
    return vote
}
