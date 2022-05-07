import { Address, ethereum } from "@graphprotocol/graph-ts"
import { assert } from "matchstick-as"
import { Collection } from "../generated/schema"
import { getAccount, getCoin, getCollection, getCollectionAddress } from "../src/helpers/initializers"

export function param(name: string, value: ethereum.Value): ethereum.EventParam {
    return new ethereum.EventParam(name, value)
}

export function str(value: string): ethereum.Value {
    return ethereum.Value.fromString(value)
}

export function num(value: i32): ethereum.Value {
    return ethereum.Value.fromI32(value)
}

export function addr(value: string): ethereum.Value {
    return ethereum.Value.fromAddress(Address.fromString(value))
}
export const addresses = ["0xa16081f360e3847006db660bae1c6d1b2e17ec2a", '0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7', '0x00005a3a3b2a69de6dbf7f01ed13b2108b2c43e9']

export function createCollection(account: string = addresses[2], coin: string = addresses[2]): Collection {
    const title = "This is title"
    const address = getCollectionAddress(addresses[0])
    address.collection = title;
    address.save()

    const collection = getCollection(title)
    collection.coin = getCoin(coin ? coin : addresses[1]).id;
    collection.owner = getAccount(account ? account : addresses[2]).id;
    collection.address = address.id
    collection.save()
    return collection
}
export function testCollectionIpfs(title: string):void {
    assert.fieldEquals("Collection", title, "name", "This is name")
    assert.fieldEquals("Collection", title, "description", "This is description")
    assert.fieldEquals("Collection", title, "image", "This is image")
    assert.fieldEquals("Collection", title, "background", "This is background")
    assert.fieldEquals("Collection", title, "goal", "1230000000000000000000")
    assert.fieldEquals("Collection", title, "url", "This is url")
    assert.fieldEquals("Collection", title, "socials", "[https://twitter.com, https://facbook.com, , a]")
    assert.fieldEquals("Collection", title, "donationOptions", "[10000000000000000000, 20000000000000000000, 30000000000000000000]")
}