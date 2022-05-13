import type { NextApiRequest, NextApiResponse } from 'next'
import { DonationDocument, DonationQueryResult } from '../../../../../graphql/generated'
import { apolloRequest } from '../../../../../idk/apollo'
import { coinName, getTokenId, toCoin } from '../../../../../idk/helpers'
import { TokenInfo } from '../../../../../interfaces/TokenInfo'

export default async function tokenMeta(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, tokenId, network } = req.query

    const donationRequest = await apolloRequest<DonationQueryResult>(DonationDocument, network.toString(), { id: getTokenId(title.toString(), tokenId.toString()) });
    const donation = donationRequest.data?.donation
    if (!donation) return res.status(404).json({ error: "no donation" })

    const returnValue: TokenInfo = {
        name: `${donation.collection.name} #${tokenId}`,
        description: donation.collection.description,
        external_url: donation.collection.url,
        image: `${process.env.NEXT_PUBLIC_URL}/api/${network}/images/${title}/${tokenId}`,
        attributes: [
            { trait_type: "Message", value: donation.message },
            { trait_type: "Donator", value: donation.donator.id },
            { trait_type: "Amount", value: toCoin(donation.amount, donation.collection.coin.id) },
            { trait_type: "Coin", value: coinName(donation.collection.coin.id) },
            { trait_type: "Time", value: donation.time, display_type: "date" }
        ],
    }
    res.status(200).json(returnValue)
}
