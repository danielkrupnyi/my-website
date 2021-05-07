import { gql } from "@apollo/client";
import client from "../apollo-client";
import { ProjectData } from "../interfaces";

interface getProjectData {
  project: ProjectData;
}

const getProject = async (slug?: string | string[]) => {
  const {
    data: { project: projectSlugs },
  } = await client.query<getProjectData>({
    query: gql`
      query getProject($slug: String) {
        project(where: { slug: $slug }) {
          title
          description
          coverImage {
            url
          }
          content
          githubLink
          liveLink
        }
      }
    `,
    variables: { slug },
  });

  return projectSlugs;
};

export default getProject;
