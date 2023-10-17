import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingsType } from "../types/mongoTypes";
import { useNavigate } from "react-router-dom";
function useFetchListings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
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
      setError("");
      const res = await fetch(`api/property?${query}`);
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
      }
      if (data.properties.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data.properties);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return { listings, loading, error, showMore, fetchMoreListings };
}

export default useFetchListings;
