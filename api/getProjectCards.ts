import { gql } from "@apollo/client";
import client from "../apollo-client";
import { ProjectCardData } from "../interfaces";

interface getProjectCardsData {
  projects: ProjectCardData[];
}

const getProjectCards = async () => {
  const {
    data: { projects },
  } = await client.query<getProjectCardsData>({
    query: gql`
      query Projects {
        projects {
          id
          title
          slug
          coverImage {
            url
          }
          description
          githubLink
          liveLink
        }
      }
    `,
  });

  return projects;
};

export default getProjectCards;
