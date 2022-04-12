// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectDocument, ProjectQueryResult } from '../../../../graphql/generated'
import { apolloRequest } from '../../../../idk/apollo'
import { getProjectId } from '../../../../idk/helpers'

export default async function contractMeta(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query as { title: string }

  const projectRequest = await apolloRequest<ProjectQueryResult>(ProjectDocument, { id: getProjectId(title, "1") })
  const project = projectRequest.data?.project;
  if (!project) return res.status(404).json({ error: " no contract" })

  const returnvalue = {
    name: project.name,
    description: project.description,
    external_link: project.url,
    seller_fee_basis_points: 10,
    fee_recipient: project.collection.owner,
    image: project.image
  }
  res.status(200).json(returnvalue)
}
