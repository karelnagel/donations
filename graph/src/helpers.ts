import { BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { Collection, Donation, Title, Global, Account, Supporter, Coin } from "../generated/schema"
import { getDonationId, getSupporterId } from "./getIds"

export function getTitle(address: string): Title | null {
    let title = Title.load(address)
    if (!title) {
        log.error("No title with {}", [address])
        return null
    }
    return title
}

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

export function getCollection(title: string): Collection {
    let collection = Collection.load(title);
    if (!collection) {
        updateGlobal(Update.collection)
        collection = new Collection(title);
        collection.address = new Bytes(0)
        collection.time = BigInt.fromU64(0)

        collection.donated = BigInt.fromU64(0)
        collection.donationsCount = 0;
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
        donation.collection = getCollection(title).id
        donation.time = BigInt.fromU64(0)

        donation.save()
    }
    return donation
}

export function getAccount(address: string): Account {
    let account = Account.load(address);
    if (!account) {
        updateGlobal(Update.user)
        log.warning("{}", [address])
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
        supporter.collection = getCollection(title).id
        supporter.account = getAccount(address).id
        supporter.donated = BigInt.fromU64(0)
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
