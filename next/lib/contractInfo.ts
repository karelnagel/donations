import { ContractInfo } from "../interfaces/api"

const contractUrl = (title: string) => `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_ID}/databases/(default)/documents/${title}/contract`

export async function getContractInfo(title: string) {
    const result = await fetch(contractUrl(title.toString()))
    if (result.status !== 200) return null
    const json = await result.json()
    const fields = json.fields
    const contract: ContractInfo = {
        name: fields.name.stringValue,
        description: fields.description.stringValue,
        image: fields.image.stringValue,
        external_link: fields.external_link?.stringValue,
        seller_fee_basis_points: Number(fields.seller_fee_basis_points?.integerValue),
        fee_recipient: fields.fee_recipient?.stringValue
    }
    return contract
}