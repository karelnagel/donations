import { ApolloClient, ApolloLink, DocumentNode, HttpLink, InMemoryCache, QueryResult } from "@apollo/client";
import { networks } from "../config";

export const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().network?.toLowerCase() !== 'rinkeby',
        new HttpLink({ uri: networks[0].graph }),
        new HttpLink({ uri: networks[1].graph })
    ),
    cache: new InMemoryCache(),
});
export async function apolloRequest<Type extends QueryResult>(query: DocumentNode, network: string, variables?: {}): Promise<Type> {
    const result = (await client.query({ query, variables, fetchPolicy: "no-cache", context: { network } })) as Type;
    return result;
}