import axios from "axios"
import { getNetwork } from "../config"
import { Coin } from "../graphql/generated"
import { toCoin } from "../idk/helpers"

export async function getTotalRaised(coins: Coin[], chainId?: number) {
    if (!getNetwork(chainId).gecko) return 0

    const uri = `https://api.coingecko.com/api/v3/simple/token_price/${getNetwork(chainId).gecko}`
    const params = {
        contract_addresses: coins.map(c => c.id.toLowerCase()).join(","),
        vs_currencies: "usd"
    }
    try {
        const result = await axios.get(uri, { params })
        if (result.status === 200) {
            let total = 0
            coins.forEach((c) => {
                total += (result.data[c.id.toLowerCase()]?.usd ?? 0) * Number(toCoin(c.donated, c.id))
            })
            return total
        }
    }
    catch (e) {
        console.log("error getting coin price " + e)
    }
    return 0
}