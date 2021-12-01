import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache()

export const client = new ApolloClient({
    uri: process.env.gqlServerUrl,
    cache: cache,
});
