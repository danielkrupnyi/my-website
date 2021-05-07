import { GetStaticPaths } from "next";
import getNumberOfPages from "../../api/getNumberOfPages";
import BlogPage, { getStaticProps } from "./index";

export default BlogPage;

export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPages = await getNumberOfPages();

  const paths = Array(numberOfPages - 1)
    .fill("")
    .map((_, i) => ({
      params: {
        page: (i + 2).toString(),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
