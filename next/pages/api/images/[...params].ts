// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getImageUrl } from '../../../lib/storage'
import axios from "axios"
export default async function contractImage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { params } = req.query
    if (!params[0]) return res.status(400).json({ error: "no title" })
    const imageUrl = await getImageUrl(`images/${params[0]}/${params[1] ?? "contract"}`)

    res.setHeader('Content-Type', 'image/jpg')
    const file = await axios.get(imageUrl, { responseType:"arraybuffer" })
    res.send(file.data)
}
