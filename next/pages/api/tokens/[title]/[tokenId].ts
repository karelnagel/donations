// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DonationDocument, DonationQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { getTokenId } from '../../../../idk/helpers'
import { TokenInfo } from '../../../../interfaces/TokenInfo'

export default async function tokenMeta(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, tokenId } = req.query

    const donationRequest = await apolloRequest<DonationQueryResult>(DonationDocument, { id: getTokenId(title.toString(), tokenId.toString()) });
    console.log(donationRequest)
    const donation = donationRequest.data?.donation
    if (!donation) return res.status(404).json({ error: "no doantion" })

    const returnValue: TokenInfo = {
        name: `${donation.project.name} #${tokenId}`,
        description: donation.project.description,
        external_url: donation.project.url,
        image: donation.project.image,
        attributes: [
            { trait_type: "Message", value: donation.message },
            { trait_type: "Original owner", value: donation.owner },
            { trait_type: "Amount", value: ethers.utils.formatEther(donation.amount) },
            { trait_type: "Project ID", value: donation.project.index }
        ],
    }
    res.status(200).json(returnValue)
}
