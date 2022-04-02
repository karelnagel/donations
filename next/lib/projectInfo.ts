import {  ProjectInfo } from "../interfaces/api"

const tokenUrl = (title: string, projectId: string) => `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_ID}/databases/(default)/documents/${title}/${projectId}`

export async function getProjectInfo(title: string, projectId: string) {
    const result = await fetch(tokenUrl(title, projectId))
    if (result.status !== 200) return null
    const json = await result.json()
    const fields = json.fields
    const contract: ProjectInfo = {
        name: fields.name.stringValue,
        description: fields.description.stringValue,
        image: fields.image.stringValue,
        external_url: fields.external_url?.stringValue,
        goal: Number(fields.goal?.integerValue),
        socials: fields.socials?.arrayValue.values.map((v: { stringValue: string }) => v.stringValue)
    }
    return contract
}