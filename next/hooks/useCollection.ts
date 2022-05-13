import { useEffect, useState } from "react";
import { Donation, useCollectionQuery, Collection } from "../graphql/generated";

export default function useCollection(title: string, network: string, initialCollection: Collection | null) {
    const [collection, setCollection] = useState(initialCollection);

    const [lastDonationId, setLastDonationId] = useState("");
    const [lastDonation, setLastDonation] = useState<Donation>();
    const { data, networkStatus } = useCollectionQuery({ variables: { id: title }, pollInterval: 1000, context: { network } });

    useEffect(() => {
        if (data?.collection) {

            setCollection(data.collection as Collection);
            if (data.collection.donations[0]) {
                if (lastDonationId && data.collection.donations[0].id !== lastDonationId) setLastDonation(data.collection.donations[0] as Donation);
                setLastDonationId(data.collection.donations[0].id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.collection]);


    return { collection, lastDonation }
}