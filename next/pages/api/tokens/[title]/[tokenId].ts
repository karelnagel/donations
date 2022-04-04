// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenDocument, TokenQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { getTokenId } from '../../../../idk/helpers'
import { TokenInfo } from '../../../../interfaces/TokenInfo'
import { getProjectInfo } from '../../../../lib/firestore'

export default async function tokenMeta(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, tokenId } = req.query

    const token = await apolloRequest<TokenQueryResult>(TokenDocument, { id: getTokenId(title.toString(), tokenId.toString()) });
    if (!token.data?.token) return res.status(404).json({ error: "no doantion" })

    const project = await getProjectInfo(title.toString(), token.data.token.project.count)
    if (!project) return res.status(404).json({ error: "No file" })
    console.log(req.headers)
    const returnValue: TokenInfo = {
        name: `${project.name} #${tokenId}`,
        description: project.description,
        external_url: project.external_url,
        image: `https://${req.headers.host}/api/images/${title}/${token.data.token.project.count}`,
        attributes: [
            { trait_type: "Message", value: token.data.token.message },
            { trait_type: "Original owner", value: token.data.token.owner.id },
            { trait_type: "Amount", value: ethers.utils.formatEther(token.data.token.amount) },
            { trait_type: "Project ID", value: token.data.token.project.count }
        ],
    }
    res.status(200).json(returnValue)
}
