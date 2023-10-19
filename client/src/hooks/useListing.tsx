import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingsType } from "../types/mongoTypes";
import { toast } from "react-toastify";
function useListing() {
  const params = useParams();
  const [listing, setListing] = useState<null | ListingsType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchListing = async () => {
      const id = params.id;
      const res = await fetch(`/api/property/${id}`);
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error("something went wrong please try again");
        return;
      }
      setListing(data.property);
    };
    fetchListing();
  }, [params]);
  return { listing, loading };
}

export default useListing;
