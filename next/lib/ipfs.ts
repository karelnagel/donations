import { Project } from "../graphql/generated";
import { create, urlSource } from 'ipfs-http-client'

export async function ipfsUpload(project: Project, file: any) {
    console.log("uploading project", project)
    //Todo upload to pinata
    const hash = "QmTMGKjYg1p1dBQw1rpgZthPGDV9eMXae1xrLQGkW34xKA"
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`
    const result = await pinToGraph(url)
    if (!result) return null
    return hash;
}

export async function pinToGraph(url: string) {
    try {
        const client = create({ url: 'https://api.thegraph.com/ipfs/api/v0/' })
        const file = await client.add(urlSource(url))
        console.log(file)
        return true
    }
    catch (e) {
        console.log(e)
        return false;
    }
}
