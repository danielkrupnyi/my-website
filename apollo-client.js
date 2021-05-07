import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import axios from "axios";

const httpLink = new HttpLink({
  uri: process.env.GRAPHCMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
  axios,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
