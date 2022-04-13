import { Project } from "../graphql/generated";
import { create, urlSource } from 'ipfs-http-client'
import axios from "axios";
import { network } from "../config";

const pinataJsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
const pinataFileUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS"
const headers = {
    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_PUBLIC!,
    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_PRIVATE!,
}
export async function ipfsUpload(project: Project, file?: any) {
    const image = file ? await uploadImage(file) : project.image
    if (!image) return null

    const hash = await uploadJson({ name: project.name, description: project.description, goal: project.goal, url: project.url, image, socials: project.socials, donationOptions: project.donationOptions })
    if (!hash) return null

    const url = `https://gateway.pinata.cloud/ipfs/${hash}`
    const result = await pinToGraph(url)
    return result ? hash : null;
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

async function uploadImage(file: any) {
    try {
        const data = new FormData();
        data.append("file", file);

        const result = await axios.post(pinataFileUrl, data, { headers })
        if (result.status !== 200) return null
        console.log("image", result.data.IpfsHash)
        return result.data.IpfsHash
    }
    catch (e) {
        console.log(e);
        return null
    }
}
async function uploadJson(object: {}) {
    try {
        const data = JSON.stringify(object, null, 2)
        const result = await axios.post(pinataJsonUrl, object, { headers })
        if (result.status !== 200) return null
        console.log("json", result.data.IpfsHash)
        return result.data.IpfsHash
    }
    catch (e) {
        console.log(e);
        return null
    }
}