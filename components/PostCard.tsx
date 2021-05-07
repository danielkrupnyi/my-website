import Link from "next/link";
import Image from "next/image";
import { fadeInUp } from "../animations";
import { motion } from "framer-motion";
import { PostCardData } from "../interfaces";

interface PostCardProps extends PostCardData {}

const PostCard = ({
  title,
  description,
  slug,
  publicationTime,
  coverImage,
}: PostCardProps) => {
  return (
    <motion.article
      variants={fadeInUp}
      className="post bg-brand-card break-inside mb-6 px-6 py-4"
    >
      <Link href={`/blog/posts/${slug}`}>
        <a>
          {coverImage && (
            <Image
              src={coverImage?.url}
              alt={`${title} image`}
              width={900}
              height={400}
              layout="intrinsic"
              priority
            />
          )}
          <h3 className="text-xl font-bold text-text mt-2">{title}</h3>
        </a>
      </Link>
      <p className="text-base text-text font-paragraph mt-4">{description}</p>
      {publicationTime && (
        <div className="text-base text-text mt-3">
          Published: {publicationTime}
        </div>
      )}
      <div className="mt-4">
        <Link href={`/blog/posts/${slug}`}>
          <a className="text-text-light hover:text-brand-dark transition">
            Read more...
          </a>
        </Link>
      </div>
    </motion.article>
  );
};

export default PostCard;
