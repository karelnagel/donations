import { NewCollection } from "../../generated/Factory/Factory"
import { param, addr, str } from "../helpers"
import { newMockEvent } from "matchstick-as/assembly/index"

export function createNewCollectinEvent(sender: string, title: string, coin: string, collection: string, ipfs: string): NewCollection {
    let newCollection = changetype<NewCollection>(newMockEvent())

    newCollection.parameters =
        [param('title', str(title)),
        param('collection', addr(collection)),
        param('coin', addr(coin)),
        param('ipfs', str(ipfs)),
        param("sender", addr(sender))]

    return newCollection
}