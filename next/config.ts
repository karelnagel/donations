import { discord, github, twitter } from "./idk/images";

export const networks = [
    {
        name: "matic",
        chainId: 137,
        factory: "0xca551fEA6ea8339cfF61C75a5b3eD04E7D5fd9f3",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/ethdon",
        graphIpfs: "https://api.thegraph.com/ipfs/api/v0/",
        ipfsGateway: "https://ipfs.io/ipfs/",
        opensea: "https://opensea.io/assets/matic/",
        etherscan: "https://polygonscan.com/address/",
        coins: [
            { coin: "Select", address: "select", decimals: 18 },
            { coin: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18 },
            { coin: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
            { coin: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
            { coin: "WBTC", address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", decimals: 8 },
            { coin: "MATIC", address: "0x0000000000000000000000000000000000001010", decimals: 18 },
            { coin: "DAI", address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", decimals: 18 },
            { coin: "LINK", address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", decimals: 18 },
            { coin: "UNI", address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", decimals: 18 },
            { coin: "AAVE", address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", decimals: 18 },
        ]
    },
    {
        name: "rinkeby",
        chainId: 4,
        factory: "0x5eF79CA6a5D3908CA9B7432b96367335E815A25F",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/ethdon-dev",
        graphIpfs: "https://api.thegraph.com/ipfs/api/v0/",
        ipfsGateway: "https://ipfs.io/ipfs/",
        opensea: "https://testnets.opensea.io/assets/",
        etherscan: "https://rinkeby.etherscan.io/address/",
        coins: [
            { coin: "Select", address: "select", decimals: 18 },
            { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", decimals: 18 }
        ]
    }
]

export const network = networks[Number(process.env.NEXT_PUBLIC_NETWORK) ?? 0]

export const links = [
    { link: "https://discord.gg/gAK73yAjJ6", image: discord },
    { link: "https://twitter.com/karelETH", image: twitter },
    { link: "https://github.com/karelnagel/donations", image: github },
]