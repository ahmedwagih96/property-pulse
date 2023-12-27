import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import useAuthentication from "./useAuthentication";
function useProfileActions() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { refreshToken } = useAuthentication();
  const [error, setError] = useState<string>("");
  const handleDeleteAccount = async () => {
    refreshToken().then(async (result) => {
      if (!result?.isAuthenticated) {
        return;
      }
      try {
        const res = await fetch(
          `/api/user/delete/${
            currentUser?._id
          }`,
          {
            credentials: "include",
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${result.accessToken}`,
            },
          }
        );
        const data = await res.json();
        if (!data.success) {
          setError(data.message);
          return;
        }
        dispatch(signOut());
        toast.success("Profile has been deleted");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    });
  };

  const signOutUser = async () => {
    try {
      const res = await fetch(
        `/api/auth/signout`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      dispatch(signOut());
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return { handleDeleteAccount, error, signOutUser };
}

export default useProfileActions;
