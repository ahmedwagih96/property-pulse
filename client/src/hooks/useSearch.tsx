import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Queries } from "../types/typings";
import { toast } from "react-toastify";
import { ListingsType } from "../types/mongoTypes";
import { handleFormInputs } from "../utils/handleFormInputs";
import { getCurrentQueries } from "../utils/getCurrentQueries";
function useSearch() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
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
    const query = new URLSearchParams(
      Array.from(searchParams.entries())
    ).toString();
    fetchListings(query);
  }, [searchParams]);

  const fetchMoreListings = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    const startIndex = listings.length;
    query.set("startIndex", startIndex.toString());
    const updatedQueries = query.toString();
    navigate(`/search?${updatedQueries}`);
  };

  const fetchListings = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`api/property?${query}`);
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.properties.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data.properties);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleQueries = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQueries(handleFormInputs(e, queries) as SetStateAction<Queries>);
  };

  // Search Form Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = getCurrentQueries(searchParams, queries);
    // Navigate to the search page with updated parameters
    navigate(`/search?${query ? query : ""}`);
  };

  return {
    handleSubmit,
    queries,
    handleQueries,
    loading,
    showMore,
    listings,
    fetchMoreListings,
  };
}
export default useSearch;
