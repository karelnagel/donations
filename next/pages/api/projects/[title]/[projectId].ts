import type { NextApiRequest, NextApiResponse } from 'next'
import { ContractDocument, ContractQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { ProjectInfoTypes } from '../../../../interfaces/ProjectInfo'
import { verifySignature } from '../../../../lib/ethers'
import { postProjectInfo } from '../../../../lib/firestore'

export default async function newProject(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, projectId } = req.query
    if (req.method === "POST") {
        const { projectInfo, signature } = req.body
        if (!projectInfo || !signature || !title || !projectId) return res.status(400).json({ error: "some data is missing from request" })

        const address = verifySignature(ProjectInfoTypes, projectInfo, signature)
        if (!address) return res.status(400).json({ error: "signature is invalid" })

        if (projectId !== "1") { // Todo add checking for start contract also
            const result = await apolloRequest<ContractQueryResult>(ContractDocument, { id: title, first: 1 })
            if (!result.data?.contract) return res.status(404).json({ error: "Contract not found " })
            if (result.data.contract.owner.id.toLowerCase() !== address.toLowerCase()) return res.status(403).json({ error: "User isn't the owner of this contract" })
        }
        const status = await postProjectInfo(title.toString(), projectId.toString(), projectInfo)
        if (!status) return res.status(400).json({ error: "error uploading data" })
        return res.status(200).json({ success: true })
    }

    else res.status(404).json({ error: "Not POST" })
}
