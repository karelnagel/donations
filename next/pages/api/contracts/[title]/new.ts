import type { NextApiRequest, NextApiResponse } from 'next'
import { ContractDocument, ContractQueryResult } from '../../../../graphql/generated'
import { client } from '../../../../idk/apollo'
import { ProjectInfoTypes } from '../../../../interfaces/ProjectInfo'
import { verifySignature } from '../../../../lib/ethers'
import { postProjectInfo } from '../../../../lib/firestore'
const formidable = require('formidable');

export default async function newProject(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title } = req.query
    if (req.method === "POST") {
        const { projectInfo, signature } = req.body
        if (!projectInfo || !signature) return res.status(400).json({ error: "projectInfo or signature missing" })

        const address = verifySignature(ProjectInfoTypes, projectInfo, signature)
        if (!address) return res.status(400).json({ error: "signature is invalid" })

        const result = (await client.query({ query: ContractDocument, variables: { id: title, first: 1 } })) as ContractQueryResult;
        const contract = result.data?.contract
        if (!contract) return res.status(404).json({ error: "Contract not found " })
        if (contract.owner.id.toLowerCase() !== address.toLowerCase()) return res.status(403).json({ error: "User isn't the owner of this contract" })

        const status = await postProjectInfo(title.toString(), (Number(contract.projects[0].count) + 1).toString(), projectInfo)
        if (!status) return res.status(400).json({ error: "error uploading data" })
        return res.status(200).json({ success: true })
    }

    else res.status(404).json({ error: "Not POST" })
}
