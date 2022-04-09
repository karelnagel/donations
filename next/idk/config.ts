import { discord, github, twitter } from "./images";

export const domain = {
    name: 'Ethereum Donations',
};

export const firebaseConfig = {
    apiKey: "AIzaSyBiTyn-u8IIkcCvcvSKu4xQHqVImkIqi70",
    authDomain: "ethdon-caf76.firebaseapp.com",
    projectId: "ethdon-caf76",
    storageBucket: "ethdon-caf76.appspot.com",
    messagingSenderId: "180297846180",
    appId: "1:180297846180:web:44b751724cbf0dbb210531",
    measurementId: "G-QQC9V6CBXE"
};

export const factoryAddress = process.env.NEXT_PUBLIC_FACTORY

export const coins = [
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