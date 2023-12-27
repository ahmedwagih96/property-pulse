import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import useAuthentication from "./useAuthentication";
function useHandleListings() {
  const { refreshToken } = useAuthentication();
  const dispatch = useAppDispatch();
  const handleDeleteListing = async (id: string) => {
    refreshToken().then(async (result) => {
      if (!result?.isAuthenticated) {
        return;
      }
      try {
        const res = await fetch(`/api/property/${id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${result.accessToken}`,
          },
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
    });
  };
  return { handleDeleteListing };
}

export default useHandleListings;
