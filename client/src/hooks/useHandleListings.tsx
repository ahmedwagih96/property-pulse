import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
function useHandleListings() {
  const dispatch = useAppDispatch();
  const handleDeleteListing = async (id: string) => {
    try {
      const res = await fetch(`/api/property/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error("something went wrong");
      }
      toast.success("listing has been deleted");
      dispatch(setUser(data.user));
    } catch (error) {
      if (error instanceof Error) {
        toast.error("something went wrong");
      }
    }
  };
  return { handleDeleteListing };
}

export default useHandleListings;
