// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ContentDocument, ContentQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { sameAddr } from '../../../../idk/helpers'
import { decrypt } from '../../../../lib/encryption'

export default async function content(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, signature, network } = req.query
  const account = ethers.utils.verifyMessage(`Load content for ${title}`, signature.toString())

  const projectRequest = await apolloRequest<ContentQueryResult>(ContentDocument, network.toString(), { title, account })
  const collection = projectRequest.data?.collection;
  if (!collection) return res.status(404).json({ error: "no contract" })

  const balance = collection.supporters[0]?.donated ?? "0"

  const returnValue = collection.content.map((c) => {
    if (sameAddr(collection.owner?.id, account) || Number(c.price) <= Number(balance)) {
      return { ...c, content: decrypt(c.content) ?? "Error with decrypting " }
    }
    else return { ...c, content: "Donate more to unlock" }
  })

  res.status(200).json(returnValue)
}
