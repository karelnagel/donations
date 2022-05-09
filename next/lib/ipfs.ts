import { Collection } from "../graphql/generated";
import { create, urlSource } from 'ipfs-http-client'
import { network } from "../config";

export async function collectionIpfsUpload(collection: Collection, imageFile?: any, backgroundFile?: any) {
    const image = imageFile ? await uploadImage(imageFile) : collection.image
    if (!image) return null
    console.log("image " + image)

    const background = backgroundFile ? await uploadImage(backgroundFile) : collection.background
    if (!background) return null
    console.log("background " + background)

    const hash = await uploadJson({ name: collection.name, description: collection.description, goal: collection.goal, url: collection.url, image, background, socials: collection.socials, donationOptions: collection.donationOptions })
    return hash
}


const authorization = "Basic " + Buffer.from(process.env.NEXT_PUBLIC_IPFS_PUBLIC + ":" + process.env.NEXT_PUBLIC_IPFS_PRIVATE).toString("base64");
export async function uploadImage(file: any) {
    try {
        const ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
            headers: {
                authorization,
            },
        });
        const result = await ipfs.add(file)
        return result.cid.toString()
    }
    catch (e) {
        console.log(e);
        return null
    }
}
export async function uploadJson(object: {}) {
    try {
        const ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
            headers: {
                authorization,
            },
        });
        const data = JSON.stringify(object, null, 2)
        const result = await ipfs.add(data)
        const hash = result.cid.toString()
        if (!hash) return null;

        const url = `https://streamint.infura-ipfs.io/ipfs/${hash}`
        const result2 = await pinToGraph(url)
        return result2 ? hash : null;
    }
    catch (e) {
        console.log(e);
        return null
    }
}

async function pinToGraph(url: string) {
    try {
        const client = create({ url: network.graphIpfs })
        const file = await client.add(urlSource(url))
        console.log("Pinned to graph!", url)
        return true
    }
    catch (e) {
        console.log(e)
        return false;
    }
}