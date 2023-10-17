import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Queries } from "../types/typings";
import { handleFormInputs } from "../utils/handleFormInputs";
function useSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queries, setQueries] = useState<Queries>({
    searchName: searchParams.get("searchName") || "",
    sort: searchParams.get("sort") || "",
    type: searchParams.get("type") || "",
    parking: searchParams.get("parking") ? true : false,
    furnished: searchParams.get("furnished") ? true : false,
  });
  useEffect(() => {
    setQueries((prev) => ({
      ...prev,
      searchName: searchParams.get("searchName") || "",
    }));
  }, [searchParams]);

  const handleQueries = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQueries(handleFormInputs(e, queries) as SetStateAction<Queries>);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    queries.searchName
      ? current.set("searchName", queries.searchName)
      : current.delete("searchName");
    queries.sort ? current.set("sort", queries.sort) : current.delete("sort");
    queries.type ? current.set("type", queries.type) : current.delete("type");
    queries.parking
      ? current.set("parking", "true")
      : current.delete("parking");
    queries.furnished
      ? current.set("furnished", "true")
      : current.delete("furnished");

    const query = current.toString();
    // Navigate to the search page with updated parameters
    navigate(`/search?${query}`);
  };
  const handleSearchBar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    queries.searchName
      ? current.set("searchName", queries.searchName)
      : current.delete("searchName");

    const query = current.toString();
    // Navigate to the search page with updated parameters
    navigate(`/search?${query}`);
  };
  return { handleSubmit, queries, handleQueries, handleSearchBar };
}
export default useSearch;