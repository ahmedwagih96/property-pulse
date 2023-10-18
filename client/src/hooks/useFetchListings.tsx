import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingsType } from "../types/mongoTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function useFetchListings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return { listings, loading, showMore, fetchMoreListings };
}

export default useFetchListings;
