import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserType } from "../types/mongoTypes";
import { toast } from "react-toastify";
function useFetchUser() {
  const params = useParams();
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      const id = params.id;
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setUser(data.user);
    };
    fetchUser();
  }, [params]);
  return { user, loading };
}

export default useFetchUser;
