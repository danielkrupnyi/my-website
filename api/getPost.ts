import { gql } from "@apollo/client";
import client from "../apollo-client";
import { PostData } from "../interfaces";

interface getPostData {
  post: PostData;
}

const getPost = async (slug?: string | string[]) => {
  const {
    data: { post },
  } = await client.query<getPostData>({
    query: gql`
      query GetPost($slug: String) {
        post(where: { slug: $slug }) {
          id
          title
          description
          coverImage {
            url
          }
          content
        }
      }
    `,
    variables: { slug },
  });

  return post;
};

export default getPost;
