import { gql } from "@apollo/client";
import client from "../apollo-client";

interface getNumberOfPostsData {
  postsConnection: {
    pageInfo: {
      pageSize: number;
    };
  };
}

const getNumberOfPosts = async () => {
  const {
    data: {
      postsConnection: {
        pageInfo: { pageSize: numberOfPosts },
      },
    },
  } = await client.query<getNumberOfPostsData>({
    query: gql`
      query NumberOfPosts {
        postsConnection {
          pageInfo {
            pageSize
          }
        }
      }
    `,
  });

  return numberOfPosts;
};

export default getNumberOfPosts;
