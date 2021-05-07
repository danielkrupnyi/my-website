import { motion } from "framer-motion";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { exit, fadeInUp } from "../../../animations";
import { PostData } from "../../../interfaces";
import Layout from "../../../components/Layout";
import getPost from "../../../api/getPost";
import getPostSlugs from "../../../api/getPostSlugs";
import MDXComponents from "../../../components/Code";

interface PostPageProps {
  post: PostData;
  content: { compiledSource: string; renderedOutput: string };
  error: string;
}

const PostPage = ({ post, content, error }: PostPageProps) => (
  <Layout
    title={`${post ? post.title : "Blog"}`}
    description={post.description}
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
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-10 leading-10"
      >
        {post.title}
      </motion.div>
      <motion.div variants={fadeInUp} className="mt-7">
        {post.coverImage?.url && (
          <Image
            src={post.coverImage?.url}
            alt={`${post.title} thumbnail`}
            width={900}
            height={400}
            layout="intrinsic"
            priority
          />
        )}
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="prose sm:prose lg:prose-lg w-full lg:w-10/12 mx-auto mt-10 text-left overflow-x-hidden"
      >
        <MDXRemote {...content} components={MDXComponents} />
      </motion.div>
    </motion.article>
  </Layout>
);

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getPostSlugs();

  return {
    paths: postSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    const post = await getPost(slug);
    const content = await serialize(post.content);

    return { props: { post, content }, revalidate: 10 };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
