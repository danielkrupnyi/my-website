import Link from "next/link";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { fadeInUp } from "../animations";
import { motion } from "framer-motion";
import { ProjectCardData } from "../interfaces";

interface ProjectCardProps extends ProjectCardData {}

const ProjectCard = ({
  title,
  slug,
  description,
  githubLink,
  liveLink,
}: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="card font-paragraph bg-brand-card break-inside mb-6"
    >
      <div className="px-6 py-4">
        <Link href={`/projects/${slug}`}>
          <a>
            <h3 className="text-xl font-bold font-headline">{title}</h3>
          </a>
        </Link>
        <p className="desc text-text-light text-base mt-2 text-justify">
          {description}
        </p>
      </div>
      <div className="flex mt-4">
        {githubLink && (
          <a
            href={githubLink}
            className={`w-3/6 ${
              !liveLink && "w-full"
            } flex justify-center bg-brand p-2 hover:bg-opacity-50 cursor-pointer transition`}
          >
            <AiFillGithub className="text-text text-2xl" />
          </a>
        )}
        {liveLink && (
          <a
            href={liveLink}
            className={`w-3/6 ${
              !githubLink && "w-full"
            } flex justify-center bg-brand p-2 hover:bg-opacity-50 cursor-pointer transition`}
          >
            <AiOutlineLink className="text-text text-2xl" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
