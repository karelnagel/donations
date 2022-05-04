import { BigInt, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { ipfs, json } from '@graphprotocol/graph-ts'
import { getCollection } from "./helpers";

export function getIpfs(title: string, ipfsHash: string): void {

    const collection = getCollection(title)
    collection.ipfs = ipfsHash;

    collection.save()

    const data = ipfs.cat(ipfsHash)
    if (!data) {
        log.error("Cat error on hash: {}", [ipfsHash])
        return
    }
    const tryValue = json.try_fromBytes(data)
    if (tryValue.isError) {
        log.error("Try from bytes error, hash: {}", [ipfsHash])
        return
    }

    const object = tryValue.value.toObject()

    const name = object.get("name")
    if (name && name.kind === JSONValueKind.STRING) collection.name = name.toString();

    const description = object.get("description")
    if (description && description.kind === JSONValueKind.STRING) collection.description = description.toString();

    const url = object.get("url")
    if (url && url.kind === JSONValueKind.STRING) collection.url = url.toString();

    const image = object.get("image")
    if (image && image.kind === JSONValueKind.STRING) collection.image = image.toString();

    const background = object.get("background")
    if (background && background.kind === JSONValueKind.STRING) collection.background = background.toString();

    const goal = object.get("goal")
    if (goal && goal.kind === JSONValueKind.STRING) collection.goal = goal.toString();

    const socials = object.get("socials")
    if (socials && socials.kind === JSONValueKind.ARRAY) {
        const socialArray = socials.toArray();

        let array = new Array<string>()
        for (let i = 0; i < socialArray.length; i++) {
            if (socialArray[i].kind === JSONValueKind.STRING) {
                array.push(socialArray[i].toString())
            }
        }
        collection.socials = array
    }

    const donationOptions = object.get("donationOptions")
    if (donationOptions) {
        const optionsArray = donationOptions.toArray();

        let array = new Array<string>()
        for (let i = 0; i < optionsArray.length; i++) {
            if (optionsArray[i].kind === JSONValueKind.STRING) {
                array.push(optionsArray[i].toString())
            }
        }
        collection.donationOptions = array
    }


    collection.save()
}