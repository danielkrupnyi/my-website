import { useState, FormEvent } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { motion } from "framer-motion";
import { exit, stagger } from "../../animations";
import { PostData } from "../../interfaces";
import getNumberOfPages from "../../api/getNumberOfPages";
import { itemsPerPage } from "../../constants";
import getPostCursors from "../../api/getPostCursors";
import everyNth from "../../utils/everyNth";
import getPaginatedPostCards from "../../api/getPaginatedPostCards";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";

interface PaginatedPostData {
  node: PostData;
}

interface BlogProps {
  posts: PaginatedPostData[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  numberOfPages: number;
  currentPageNumber: number;
  error: string;
}

const Blog = ({
  posts,
  hasNextPage,
  hasPreviousPage,
  numberOfPages,
  currentPageNumber,
  error,
}: BlogProps) => {
  const [searchPosts, setSearchPosts] = useState<PostData[] | []>();
  const [search, setSearch] = useState<string>("");

  const onSearchChangeHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    setSearch(target.value);

    const {
      data: { posts },
    } = await axios.post(
      "/api/search-posts",
      { search },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    setSearchPosts(posts);
  };

  return (
    <Layout title="Blog" description="Read my personal dev blog.">
      <motion.section
        exit={exit}
        initial="initial"
        animate="animate"
        className="section"
      >
        {error && <span className="text-red-700">Error: {error}</span>}

        {numberOfPages ? (
          <SearchBar search={search} onChangeHandler={onSearchChangeHandler} />
        ) : null}

        <motion.div
          variants={stagger}
          className="masonry-1-col lg:masonry-2-col before:box-inherit after:box-inherit min-h-adjustable-min sm:min-h-adjustable"
        >
          {search
            ? searchPosts?.map((post: PostData) => (
                <PostCard key={post.id} {...post} />
              ))
            : posts?.map((post: any) => (
                <PostCard key={post.node.id} {...post.node} />
              ))}

          {!posts?.length && (
            <span className="text-text-light">Posts not found</span>
          )}
        </motion.div>

        {numberOfPages ? (
          <Pagination
            numberOfPages={numberOfPages}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            currentPageNumber={currentPageNumber}
          />
        ) : null}
      </motion.section>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const currentPageNumber = +((params?.page as string) || 0);
    const numberOfPages = await getNumberOfPages();
    const sortedCursors = everyNth(await getPostCursors(), itemsPerPage);
    let paths: any[] = [];

    if (numberOfPages) {
      paths = Array(numberOfPages - 1)
        .fill("")
        .map((_, i) => ({
          currentPage: (i + 2).toString(),
          slug: sortedCursors[i]?.cursor,
        }));
    }

    const currentPointer = paths.find((item) => {
      if (item.currentPage === currentPageNumber.toString()) return item;
    });

    const {
      edges,
      pageInfo: { hasNextPage, hasPreviousPage },
    } = await getPaginatedPostCards(currentPointer?.slug);

    return {
      props: {
        posts: edges,
        hasNextPage,
        hasPreviousPage,
        numberOfPages,
        currentPageNumber,
      },
      revalidate: 10,
    };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
