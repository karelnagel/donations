// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ContractDocument, ContractQueryResult } from '../../../../graphql/generated';
import { apolloRequest } from '../../../../idk/apollo'
import { getProjectInfo } from '../../../../lib/firestore'

export default async function contractMeta(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query

  const contract = await apolloRequest<ContractQueryResult>(ContractDocument, { id: title })
  if (!contract.data?.contract) return res.status(404).json({ error: " no contract" })

  const project = await getProjectInfo(title.toString(), "1")
  if (!project) return res.status(404).json({ error: "No file" })

  const returnvalue = {
    name: project.name,
    description: project.description,
    external_link: project.external_url,
    seller_fee_basis_points: 10,
    fee_recipient: contract.data.contract.owner.id,
    image: `https://${req.headers.host}/api/images/${title}/1`,
  }
  res.status(200).json(returnvalue)
}
