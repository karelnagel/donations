import { Chain, chain } from "@wagmi/core";
import { discord, etherscan, github, twitter } from "./idk/images";

export const ipfsGateway = "https://streamint.infura-ipfs.io/ipfs/";
export const graphIpfs = "https://api.thegraph.com/ipfs/api/v0/";
interface Network { chain: Chain, factory: string, graph: string, opensea: string, gecko: string | null, coins: { coin: string, address: string, decimals: number }[] }
export const networks: Network[] = [
    {
        chain: chain.polygon,
        factory: "0xD6E1C31667d2eB29A3721848fb3ca1b7c9e7A5A0",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/streamint",
        opensea: "https://opensea.io/assets/matic/",
        gecko: "polygon-pos",
        coins: [
            { coin: "Select", address: "select", decimals: 18 },
            { coin: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18 },
            { coin: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
            { coin: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
            { coin: "WBTC", address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", decimals: 8 },
            { coin: "DAI", address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", decimals: 18 },
            { coin: "LINK", address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", decimals: 18 },
            { coin: "UNI", address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", decimals: 18 },
            { coin: "AAVE", address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", decimals: 18 },
        ]
    },
    {
        chain: chain.rinkeby,
        factory: "0x97a8485B5a1C3cCd156bbDE61C19F926110Eb63f",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/streamint-dev",
        opensea: "https://testnets.opensea.io/assets/",
        gecko: null,
        coins: [
            { coin: "Select", address: "select", decimals: 18 },
            { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", decimals: 18 }
        ]
    }
]
export const getNetwork = (chainId?: number): Network => {
    if (chainId) {
        const net = networks.find(c => c.chain.id === chainId)
        if (net) return net
    }
    return networks[0]
}
export const getNetworkByName = (name?: string): Network => {
    if (name) {
        const net = networks.find(c => c.chain.name.toLowerCase() === name.toLowerCase())
        if (net) return net
    }
    return networks[0]
}

export const links = [
    { link: "https://discord.gg/gAK73yAjJ6", image: discord },
    { link: "https://twitter.com/Streamint_", image: twitter },
    { link: "https://github.com/karelnagel/streamint", image: github },
    { link: `todo`, image: etherscan },
]
