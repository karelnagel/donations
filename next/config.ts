import { discord, github, twitter } from "./idk/images";

export const networks = [
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
            { coin: "Select", address: "select" },
            { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" }
        ]
    }
]

export const network = networks[Number(process.env.NEXT_PUBLIC_NETWORK) ?? 0]

export const links = [
    { link: "https://discord.gg/gAK73yAjJ6", image: discord },
    { link: "https://twitter.com/karelETH", image: twitter },
    { link: "https://github.com/karelnagel/donations", image: github },
]