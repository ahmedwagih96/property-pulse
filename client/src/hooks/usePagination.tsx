import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
function usePagination(count: number) {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(params.get("pageNumber")) || 1
  );
  const [limit, setLimit] = useState<number>(Number(params.get("limit")) || 8);
  useEffect(() => {
    setLimit(Number(params.get("limit") || 8));
  }, [params]);

  const paginationCount = Math.ceil(count / limit);
  const paginationButtons = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= paginationCount; i++) {
      pages.push(i);
    }
    return pages;
  }, [paginationCount]);

  const getPath = (page: number) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set("pageNumber", page.toString());
    const query = current.toString();
    return `${pathname}?${query}`;
  };

  return {
    getPath,
    setCurrentPage,
    paginationButtons,
    currentPage,
    paginationCount,
  };
}

export default usePagination;
