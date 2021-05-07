import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Slug } from "../interfaces";

interface getProjectSlugsData {
  projects: Slug[];
}

const getProjectSlugs = async () => {
  const {
    data: { projects },
  } = await client.query<getProjectSlugsData>({
    query: gql`
      query getProjectSlugs {
        projects {
          slug
        }
      }
    `,
  });

  return projects;
};

export default getProjectSlugs;
