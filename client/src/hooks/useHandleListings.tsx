import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/userSlice";
function useHandleListings() {
  const dispatch = useAppDispatch();
  const handleDeleteListing = async (id: string) => {
    try {
      const res = await fetch(`/api/property/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        console.log("error");
      }
      dispatch(setUser(data.user));
    } catch (error) {
      if (error instanceof Error) {
        console.log("error");
      }
    }
  };
  return { handleDeleteListing };
}

export default useHandleListings;
