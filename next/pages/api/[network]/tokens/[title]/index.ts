// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CollectionDocument, CollectionQueryResult } from '../../../../../graphql/generated'
import { apolloRequest } from '../../../../../idk/apollo'
import { getImage } from '../../../../../idk/helpers'

export default async function contractMeta(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, network } = req.query 

  const projectRequest = await apolloRequest<CollectionQueryResult>(CollectionDocument, network.toString(), { id: title })
  const collection = projectRequest.data?.collection;
  if (!collection) return res.status(404).json({ error: " no contract" })

  const returnvalue = {
    name: collection.name,
    description: collection.description,
    external_link: collection.url,
    seller_fee_basis_points: 750,
    fee_recipient: collection.owner?.id,
    image: getImage(collection.image),
    background: getImage(collection.background)
  }
  res.status(200).json(returnvalue)
}
