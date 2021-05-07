import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apollo-client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      data: { posts },
    } = await client.query({
      query: gql`
        query GetFoundedPosts($search: String) {
          posts(where: { title_contains: $search }) {
            id
            title
            slug
            coverImage {
              url
            }
            description
          }
        }
      `,
      variables: {
        search: req.body.search,
      },
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
