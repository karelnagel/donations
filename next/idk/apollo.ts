import { ApolloClient, DocumentNode, InMemoryCache, QueryResult } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
});
export async function apolloRequest<Type extends QueryResult>(query: DocumentNode, variables?: {}):Promise<Type> {
    const result = (await client.query({ query, variables })) as Type;
    return result;
}