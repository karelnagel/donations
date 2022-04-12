import { useContext, useEffect, useState } from "react";
import { Donation, Project, ProjectDocument, ProjectQueryResult } from "../graphql/generated";
import { Context } from "../idk/context";
import { BigNumber, Contract, ethers } from "ethers";
import { apolloRequest } from "../idk/apollo";
import { getProjectId } from "../idk/helpers";
import { contractAbi } from "./useChain";

export default function useProject(title?: string, projectId?: string, initialProject?: Project) {
    const [project, setProject] = useState(initialProject);
    const [newDonation, setNewDonation] = useState<Donation>();
    const { provider: userProvider } = useContext(Context);


    useEffect(() => {
        async function effect() {
            if (projectId && title) {
                const result = await apolloRequest<ProjectQueryResult>(ProjectDocument, { id: getProjectId(title, projectId) })
                const pro = result.data?.project
                if (pro) setProject(pro as Project)
            }
        }
        effect()
    }, [projectId, title])

    useEffect(() => {
        if (project?.collection.address && projectId && title) {
            const provider = userProvider ?? new ethers.providers.InfuraProvider(process.env.NEXT_PUBLIC_NETWORK, process.env.NEXT_PUBLIC_INFURA_ID)

            const contract = new Contract(project.collection.address, contractAbi, provider)
            const filter = contract.filters.NewDonation();
            contract.on(filter, (id: BigNumber, proId: BigNumber, owner: string, amount: BigNumber, message: string) => {
                console.log(owner, amount, message, id, proId);
                const newToken: Donation = {
                    amount: amount.toString(),
                    message,
                    owner,
                    originalOwner: owner,
                    time: new Date(),
                    project: { coin: project.coin } as Project,
                    id: ""
                }
                setNewDonation(newToken)
                setProject((p) => p ? ({
                    ...p,
                    donated: BigNumber.from(p.donated).add(amount).toString(),
                    donationCount: p.donationCount + 1,
                }) : p)
            });

            return () => {
                contract.removeAllListeners()
            };
        }
    }, [project?.coin, project?.collection.address, projectId, title, userProvider]);

    return { project, newDonation }
}