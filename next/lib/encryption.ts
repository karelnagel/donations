const Crypt = require("hybrid-crypto-js").Crypt

export function encrypt(message: string) {
    try {
        const crypt = new Crypt();
        const encrypted = crypt.encrypt(process.env.NEXT_PUBLIC_RSA_PUBLIC, message)
        const base64 = Buffer.from(encrypted, "utf-8").toString("base64")

        return base64;
    }
    catch {
        return null
    }
}
export function decrypt(base64: string) {
    try {
        const crypt = new Crypt();
        const encrypted = Buffer.from(base64, "base64").toString("utf8")
        const decrypted = crypt.decrypt(process.env.RSA_PRIVATE, encrypted) //Todo move keys to env

        return decrypted.message
    }
    catch {
        return null
    }
}