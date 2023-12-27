"use client";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";
const Pagination = ({ count }: { count: number }) => {
  const {
    paginationButtons,
    currentPage,
    setCurrentPage,
    paginationCount,
    getPath,
  } = usePagination(count);
  return (
    <div className="flex items-center justify-center p-5 mb-2 mt-auto">
      <Link
        to={getPath(currentPage - 1)}
        className={`h-[40px] border-2 border-gray-300 flex justify-center items-center text-lg font-bold text-dark-color cursor-pointer rounded-l-lg w-max-content px-7 ${
          currentPage === 1 ? "pointer-events-none" : ""
        }`}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </Link>
      {paginationButtons.map((page) => (
        <Link
          to={getPath(page)}
          className={`w-[40px] h-[40px] border-2 border-gray-300 flex justify-center items-center text-lg font-bold text-dark-color cursor-pointer ${
            page === currentPage ? "bg-gray-300" : ""
          }`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Link>
      ))}
      <Link
        to={getPath(currentPage + 1)}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={` h-[40px] border-2 border-gray-300 flex justify-center items-center text-lg font-bold text-dark-color cursor-pointer rounded-r-lg w-max-content px-7 ${
          currentPage === paginationCount ? "pointer-events-none" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
