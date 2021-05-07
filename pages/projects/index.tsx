import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { exit, stagger } from "../../animations";
import getProjectCards from "../../api/getProjectCards";
import { ProjectCardData } from "../../interfaces";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";

interface ProjectsProps {
  projects: ProjectCardData[];
  error: string;
}

const Projects = ({ projects, error }: ProjectsProps) => {
  return (
    <Layout title="Projects" description="Here are the projects I've created.">
      <motion.section
        exit={exit}
        initial="initial"
        animate="animate"
        variants={stagger}
        className="section masonry-1-col sm:masonry-2-col lg:masonry-3-col before:box-inherit after:box-inherit"
      >
        {error && <span className="text-red-700">Error: {error}</span>}

        {projects?.length ? (
          projects.map((project) => (
            <ProjectCard {...project} key={project.id} />
          ))
        ) : (
          <span className="text-text-light">Projects not found</span>
        )}
      </motion.section>
    </Layout>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const projects = await getProjectCards();

    return { props: { projects }, revalidate: 10 };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
