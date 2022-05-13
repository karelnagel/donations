import { getNetworkByName } from "../config"

type CollectionPages = "content" | "vote" | "edit" | "stream" | "supporters" | null

export const collectionUrl = (title?: string, network?: string, page?: CollectionPages, base?: boolean) => {
    const baseUrl = process.env.NEXT_PUBLIC_URL
    return `${base ? baseUrl : ""}/${network?.toLowerCase()}/${title}/${page ?? ""}`
}
export const openseaUrl = (network: string, address: string, tokenId: string) => `${getNetworkByName(network).opensea}${address}/${tokenId}`