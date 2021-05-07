import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Slug } from "../interfaces";

interface getPostSlugsData {
  posts: Slug[];
}

const getPostSlugs = async () => {
  const {
    data: { posts },
  } = await client.query<getPostSlugsData>({
    query: gql`
      query GetPostSlugs {
        posts {
          slug
        }
      }
    `,
  });

  return posts;
};

export default getPostSlugs;
