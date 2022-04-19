import { useEffect, useState } from "react";
import { Donation, Project, useProjectQuery } from "../graphql/generated";
import { getProjectId } from "../idk/helpers";

export default function useProject(title: string, projectId: string, initialProject: Project | null) {
    const [project, setProject] = useState(initialProject);

    const [lastDonationId, setLastDonationId] = useState("");
    const [lastDonation, setLastDonation] = useState<Donation>();
    const { data, networkStatus } = useProjectQuery({ variables: { id: getProjectId(title!, projectId!) }, pollInterval: 1000 });

    useEffect(() => {
        console.log("network status:", networkStatus)
        if (data?.project) {

            setProject(data.project as Project);
            if (data.project.donations[0]) {
                if (lastDonationId && data.project.donations[0].id !== lastDonationId) setLastDonation(data.project.donations[0] as Donation);
                setLastDonationId(data.project.donations[0].id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.project]);


    return { project, lastDonation }
}