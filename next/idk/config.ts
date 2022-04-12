import { discord, github, twitter } from "./images";

export const factoryAddress = process.env.NEXT_PUBLIC_FACTORY

export const coins = [
    { coin: "Select", address: "select" },
    { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" }
]

export const networks = [
    {
        name: "rinkeby",
        factory: process.env.NEXT_PUBLIC_FACTORY,
        coins: [
            { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" }
        ]
    }
]

export const links = [
    { link: "https://discord.gg/gAK73yAjJ6", image: discord },
    { link: "https://twitter.com/karelETH", image: twitter },
    { link: "https://github.com/karelnagel/donations", image: github },
]