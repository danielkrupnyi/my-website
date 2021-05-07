import { gql } from "@apollo/client";
import client from "../apollo-client";
import { itemsPerPage } from "../constants";
import { PostCardData } from "../interfaces";

interface getPaginatedPostCardsData {
  postsConnection: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: {
      node: PostCardData;
    };
  };
}

const getPaginatedPostCards = async (pointer: string | null | undefined) => {
  const {
    data: {
      postsConnection: { pageInfo, edges },
    },
  } = await client.query<getPaginatedPostCardsData>({
    query: gql`
      query GetPaginatedPosts($postsPerPage: Int!, $postPointer: String) {
        postsConnection(
          first: $postsPerPage
          after: $postPointer
          orderBy: publicationTime_DESC
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              slug
              coverImage {
                url
              }
              publicationTime
              description
            }
          }
        }
      }
    `,
    variables: {
      postsPerPage: itemsPerPage,
      postPointer: pointer,
    },
  });

  return {
    edges,
    pageInfo,
  };
};

export default getPaginatedPostCards;
