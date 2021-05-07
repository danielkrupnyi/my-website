import { motion } from "framer-motion";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { exit, fadeInUp } from "../../animations";
import getProject from "../../api/getProject";
import getProjectSlugs from "../../api/getProjectSlugs";
import { ProjectData } from "../../interfaces";
import Layout from "../../components/Layout";

interface ProjectPageProps {
  project: ProjectData;
  content: { compiledSource: string; renderedOutput: string };
  error: string;
}

const ProjectPage = ({ project, content, error }: ProjectPageProps) => {
  return (
    <Layout
      title={`${project ? project.title : "Projects"}`}
      description={project.description}
    >
      <motion.article
        exit={exit}
        initial="initial"
        animate="animate"
        className="article"
      >
        {error && <span className="text-red-700">Error: {error}</span>}
        <motion.div
          variants={fadeInUp}
          className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl mt-10 leading-10"
        >
          {project.title}
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="flex mt-5 justify-center items-center"
        >
          {project.githubLink && (
            <a
              href={project.githubLink}
              className="flex justify-center mx-2 bg-brand p-2 hover:bg-opacity-50 cursor-pointer transition"
            >
              <AiFillGithub className="text-text text-2xl" />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              className="flex justify-center mx-2 bg-brand p-2 hover:bg-opacity-50 cursor-pointer transition"
            >
              <AiOutlineLink className="text-text text-2xl" />
            </a>
          )}
        </motion.div>
        <motion.div variants={fadeInUp} className="mt-7">
          {project.coverImage?.url && (
            <Image
              src={project.coverImage?.url}
              alt={`${project.title} thumbnail`}
              width={900}
              height={480}
              layout="intrinsic"
              priority
            />
          )}
        </motion.div>
        <motion.div className="prose sm:prose lg:prose-lg w-full mx-auto lg:w-10/12 mt-10 text-left overflow-x-hidden">
          <MDXRemote {...content} />
        </motion.div>
      </motion.article>
    </Layout>
  );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectSlugs = await getProjectSlugs();

  return {
    paths: projectSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const project = await getProject(params?.slug);
    const content = await serialize(project.content);

    return { props: { project, content }, revalidate: 10 };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
