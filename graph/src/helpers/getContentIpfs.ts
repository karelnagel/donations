import { BigInt, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { ipfs, json } from '@graphprotocol/graph-ts'
import { getContent } from "./initializers";

export function getContentIpfs(title: string, ipfsHash: string): void {

    const content = getContent(title, ipfsHash)

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

    const description = object.get("description")
    if (description && description.kind === JSONValueKind.STRING) content.description = description.toString();

    const cont = object.get("content")
    if (cont && cont.kind === JSONValueKind.STRING) content.content = cont.toString();

    const price = object.get("price")
    if (price && price.kind === JSONValueKind.STRING) content.price = BigInt.fromString(price.toString());

    content.save()
}