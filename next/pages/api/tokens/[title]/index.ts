// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OSContractInfo } from '../../../../interfaces/ContractInfo'
import { getContractInfo } from '../../../../lib/firestore'

export default async function contractMeta(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query

  const contract = await getContractInfo(title.toString())
  if (!contract) return res.status(404).json({ error: "No file" })

  const returnvalue: OSContractInfo = {
    name: contract.name,
    description: contract.description,
    external_link: contract.external_link,
    seller_fee_basis_points: contract.seller_fee_basis_points,
    fee_recipient: contract.fee_recipient,
    image: `https://${req.headers.host}/api/images/${title}/contract`,
  }
  res.status(200).json(returnvalue)
}
