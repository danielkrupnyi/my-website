import Link from "next/link";
import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  numberOfPages: number;
  currentPageNumber: number;
}

const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  numberOfPages,
  currentPageNumber,
}: PaginationProps) => {
  const router = useRouter();

  const pages = Array(numberOfPages - 1)
    .fill("")
    .map((_, i) => i + 2);

  const pagesSlider = () => {
    const pagesCount = 3;

    let resPages = pages.filter((_, i) => i < pagesCount);

    if (
      currentPageNumber === resPages[resPages.length - 1] &&
      currentPageNumber !== numberOfPages
    ) {
      const res = [...resPages, currentPageNumber + 1];
      return (resPages = res.slice(1, res.length));
    }

    if (
      currentPageNumber > resPages[resPages.length - 1] &&
      currentPageNumber < numberOfPages
    ) {
      const res = [currentPageNumber, currentPageNumber + 1];
      return res;
    }

    if (currentPageNumber === numberOfPages) {
      const res =
        currentPageNumber > 2
          ? [currentPageNumber - 1, currentPageNumber]
          : [currentPageNumber];

      return res;
    }

    return resPages;
  };

  const prev: boolean = router.asPath.match(/^\/blog$/)
    ? false
    : router.asPath.match(/^\/blog$/)
    ? false
    : hasPreviousPage;

  const next: boolean =
    router.asPath.match(/^\/blog$/) && currentPageNumber !== 0
      ? true
      : currentPageNumber === numberOfPages
      ? false
      : hasNextPage;

  return pages.length ? (
    <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6 mt-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {prev && (
          <Link
            href={`${
              prev
                ? `/blog/${
                    currentPageNumber === 2 ? " " : currentPageNumber - 1
                  }`
                : `/blog`
            }`}
          >
            <a className="relative inline-flex items-center px-2 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition">
              Previous
            </a>
          </Link>
        )}
        {next && (
          <Link
            href={`${
              hasNextPage
                ? `/blog/${
                    currentPageNumber === 0
                      ? currentPageNumber + 2
                      : currentPageNumber + 1
                  }`
                : `/blog/${currentPageNumber}`
            }`}
          >
            <a className="relative inline-flex items-center px-2 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition disabled:opacity-50">
              Next
            </a>
          </Link>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {prev && (
            <Link
              href={`${
                prev
                  ? `/blog/${
                      currentPageNumber === 2 ? " " : currentPageNumber - 1
                    }`
                  : `/blog`
              }`}
            >
              <a className="relative inline-flex items-center px-2 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition">
                <span className="sr-only">Previous</span>
                <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
              </a>
            </Link>
          )}

          <Link href={`/blog`}>
            <a
              className={`relative inline-flex items-center px-4 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition
              ${
                router.asPath.match(/^\/blog$/) &&
                "bg-brand-light border-brand-light border-opacity-0 text-text"
              }`}
            >
              {1}
            </a>
          </Link>

          {pagesSlider().map((num) => (
            <Link href={`/blog/${num}`} key={num}>
              <a
                className={`relative inline-flex items-center px-4 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition
                  ${
                    router.asPath.match(new RegExp(`^/blog/${num}$`)) &&
                    "bg-brand-light border-brand-light border-opacity-0 text-text"
                  }
                `}
              >
                {num}
              </a>
            </Link>
          ))}

          {next && (
            <Link
              href={`${
                hasNextPage
                  ? `/blog/${
                      currentPageNumber === 0
                        ? currentPageNumber + 2
                        : currentPageNumber + 1
                    }`
                  : `/blog/${currentPageNumber}`
              }`}
            >
              <a className="relative inline-flex items-center px-2 py-2 border border-text-light border-opacity-20 bg-white text-sm font-medium text-text-light hover:bg-brand-light transition disabled:opacity-50">
                <span className="sr-only">Next</span>
                <FaAngleRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Link>
          )}
        </nav>
      </div>
    </div>
  ) : null;
};

export default Pagination;
