import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Cursor } from "../interfaces";

interface getPostsCursorsData {
  postsConnection: {
    edges: Cursor[];
  };
}

const getPostsCursors = async () => {
  const {
    data: {
      postsConnection: { edges },
    },
  } = await client.query<getPostsCursorsData>({
    query: gql`
      query GetPostsCursors {
        postsConnection(orderBy: publicationTime_DESC) {
          edges {
            cursor
          }
        }
      }
    `,
  });

  return edges;
};

export default getPostsCursors;
