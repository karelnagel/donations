// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getProjectInfo } from '../../../../lib/projectInfo'

export default async function tokenMeta(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, projectId } = req.query

    const token = await getProjectInfo(title.toString(), projectId.toString())
    // Todo get message and donation size and put to attributes
    if (token) res.status(200).json(token)
    else res.status(404).json({error:"No file"})
}
