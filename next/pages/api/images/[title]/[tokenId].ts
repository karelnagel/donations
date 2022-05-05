const Jimp = require('jimp');
import type { NextApiRequest, NextApiResponse } from 'next'
import { DonationDocument, DonationQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { coinName, getImage, getTokenId, toCoin } from '../../../../idk/helpers'

export default async function tokenImage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, tokenId } = req.query

    const donationRequest = await apolloRequest<DonationQueryResult>(DonationDocument, { id: getTokenId(title.toString(), tokenId.toString()) });
    console.log(donationRequest)
    const donation = donationRequest.data?.donation
    if (!donation) return res.status(404).json({ error: "no doantion" })


    const image = await Jimp.read(getImage(donation.collection.image));
    image.resize(1000, 1000)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    // const font = await Jimp.loadFont(`${process.env.NEXT_PUBLIC_URL}/6SITIR8cBUj_TAtJu5osKfed.ttf_0.fnt`);

    const logo = await Jimp.read(`${process.env.NEXT_PUBLIC_URL}/favicon.png`);
    logo.resize(140, 140)
    image.composite(logo, 0, 0)
    image.print(font, 0, 0, {
        text: `${toCoin(donation.amount)} ${coinName(donation.collection.coin)}`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    }, 1000, 1000);

    image.print(font, 0, 0, {
        text: `${donation.message}`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
    }, 1000, 1000);

    try {
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG)
        if (buffer) {
            return res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length
            }).end(buffer);
        }
    }
    catch (e) {
        console.log(e)
    }
    return res.status(404).send({ error: "error with image" })
}
