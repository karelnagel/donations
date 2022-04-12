import { BigInt, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { ipfs, json } from '@graphprotocol/graph-ts'
import { getProject } from "./helpers";

export function getIpfs(title: string, projectId: BigInt, ipfsHash: string): void {

    const project = getProject(title, projectId)
    project.ipfs = ipfsHash;

    project.save()

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
    if (name && name.kind === JSONValueKind.STRING) project.name = name.toString();

    const description = object.get("description")
    if (description && description.kind === JSONValueKind.STRING) project.description = description.toString();

    const url = object.get("url")
    if (url && url.kind === JSONValueKind.STRING) project.url = url.toString();

    const image = object.get("image")
    if (image && image.kind === JSONValueKind.STRING) project.image = image.toString();

    const goal = object.get("goal")
    if (goal && goal.kind === JSONValueKind.STRING) project.goal = goal.toString();

    const socials = object.get("socials")
    if (socials && socials.kind === JSONValueKind.ARRAY) {
        const socialArray = socials.toArray();

        let array = new Array<string>()
        for (let i = 0; i < socialArray.length; i++) {
            if (socialArray[i].kind === JSONValueKind.STRING) {
                array.push(socialArray[i].toString())
            }
        }
        project.socials = array
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
        project.donationOptions = array
    }


    project.save()
}