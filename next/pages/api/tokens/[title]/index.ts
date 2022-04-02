// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getContractInfo } from '../../../../lib/contractInfo'

export default async function contractMeta(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query

  const contract = await getContractInfo(title.toString())
  if (contract) res.status(200).json(contract)
  else res.status(404).json({error:"No file"})
}
