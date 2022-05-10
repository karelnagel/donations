import { discord, etherscan, github, twitter } from "./idk/images";

export const networks = [
    {
        name: "matic",
        chainId: 137,
        factory: "0xca551fEA6ea8339cfF61C75a5b3eD04E7D5fd9f3",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/streamint",
        graphIpfs: "https://api.thegraph.com/ipfs/api/v0/",
        ipfsGateway: "https://streamint.infura-ipfs.io/ipfs/",
        opensea: "https://opensea.io/assets/matic/",
        gecko: "polygon-pos",
        etherscan: "https://polygonscan.com/address/",
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
        name: "rinkeby",
        chainId: 4,
        factory: "0x97a8485B5a1C3cCd156bbDE61C19F926110Eb63f",
        graph: "https://api.thegraph.com/subgraphs/name/karelnagel/streamint-dev",
        graphIpfs: "https://api.thegraph.com/ipfs/api/v0/",
        ipfsGateway: "https://streamint.infura-ipfs.io/ipfs/",
        opensea: "https://testnets.opensea.io/assets/",
        etherscan: "https://rinkeby.etherscan.io/address/",
        gecko: null,
        coins: [
            { coin: "Select", address: "select", decimals: 18 },
            { coin: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", decimals: 18 }
        ]
    }
]

export const network = networks[Number(process.env.NEXT_PUBLIC_NETWORK) ?? 0]

export const links = [
    { link: "https://discord.gg/gAK73yAjJ6", image: discord },
    { link: "https://twitter.com/Streamint_", image: twitter },
    { link: "https://github.com/karelnagel/streamint", image: github },
    { link: `${network.etherscan}${network.factory}`, image: etherscan },
]

export const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----`

export const privateKey = `
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
    WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
    aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
    AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
    xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
    m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
    8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
    z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
    rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
    V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
    aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
    psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
    uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
    -----END RSA PRIVATE KEY-----`