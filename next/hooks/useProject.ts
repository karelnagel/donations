import { useContext, useEffect, useState } from "react";
import { Account, Project, ProjectDocument, ProjectQueryResult, Token } from "../graphql/generated";
import { Context } from "../idk/context";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { apolloRequest } from "../idk/apollo";
import { getProjectId } from "../idk/helpers";
import { contractAbi } from "./useChain";

export default function useProject(title: string, projectId: string, initialProject?: Project | null) {
    const [project, setProject] = useState(initialProject);
    const { provider: userProvider } = useContext(Context);


    useEffect(() => {
        async function effect() {
            const result = await apolloRequest<ProjectQueryResult>(ProjectDocument, { id: getProjectId(title, projectId) })
            console.log(result)
            const pro = result.data?.project
            if (pro) setProject(pro as Project)
        }
        effect()
    }, [projectId, title])

    useEffect(() => {
        if (project?.contract.address) {
            const provider = userProvider ?? new ethers.providers.InfuraProvider(process.env.NEXT_PUBLIC_NETWORK, process.env.NEXT_PUBLIC_INFURA_ID)

            const contract = new Contract(project.contract.address, contractAbi, provider)
            const filter = contract.filters.NewToken();
            contract.on(filter, (id: BigNumber, proId: BigNumber, owner: string, amount: BigNumber, message: string) => {
                console.log(owner, amount, message, id, proId);
                const newToken = {
                    amount: amount.toString(),
                    message,
                    owner: { id: owner } as Account,
                    time: new Date(),
                }
                setProject((p) => p ? ({
                    ...p,
                    donated: BigNumber.from(p.donated).add(amount).toString(),
                    donationCount: p.donationCount + 1,
                    tokens: [newToken as Token, ...p.tokens]
                }) : p)
            });

            return () => {
                contract.removeAllListeners()
            };
        }
    }, [project?.contract.address, projectId, userProvider]);

    return project
}