import { itemsPerPage } from "../constants";
import getNumberOfPosts from "./getNumberOfPosts";

const getNumberOfPages = async () => {
  const numberOfPosts: number = await getNumberOfPosts();
  return Math.ceil(numberOfPosts / itemsPerPage);
};

export default getNumberOfPages;
