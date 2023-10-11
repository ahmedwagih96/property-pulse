import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/features/userSlice";
function useProfileActions() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [error, setError] = useState<string>("");
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
      });
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

  const signOutUser = async () => {
    try {
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (!data.success) {
        console.log("here");
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
