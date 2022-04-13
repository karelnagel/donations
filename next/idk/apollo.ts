import { ApolloClient, DocumentNode, InMemoryCache, QueryResult } from "@apollo/client";
import { network } from "../config";

export const client = new ApolloClient({
    uri: network.graph,
    cache: new InMemoryCache(),
});
export async function apolloRequest<Type extends QueryResult>(query: DocumentNode, variables?: {}): Promise<Type> {
    const result = (await client.query({ query, variables })) as Type;
    return result;
}