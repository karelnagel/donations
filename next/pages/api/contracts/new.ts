import type { NextApiRequest, NextApiResponse } from 'next'
import { ContractListDocument, ContractListQueryResult } from '../../../graphql/generated'
import { client } from '../../../idk/apollo'
import { ContractInfoTypes } from '../../../interfaces/ContractInfo'
import { verifySignature } from '../../../lib/ethers'
import { postContractInfo, postProjectInfo } from '../../../lib/firestore'

export default async function newContract(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { contractInfo, signature, title, projectInfo } = req.body
        if (!contractInfo || !signature || !title) return res.status(400).json({ error: "data missing" })

        const address = verifySignature(ContractInfoTypes, contractInfo, signature)
        if (!address) return res.status(400).json({ error: "signature is invalid" })

        const result = (await client.query({ query: ContractListDocument })) as ContractListQueryResult;
        const contracts = result.data?.contracts
        if (!contracts) return res.status(404).json({ error: "Error getting data" })
        if (contracts.map(c => c.id).includes(title)) return res.status(403).json({ error: "Title already used" })

        const status = await postContractInfo(title, contractInfo)
        if (!status) return res.status(400).json({ error: "error uploading data" })

        const status2 = await postProjectInfo(title, "1", projectInfo)
        if (!status2) return res.status(400).json({ error: "error uploading data" })
        return res.status(200).json({ success: true })
    }

    else res.status(404).json({ error: "Not POST" })
}
