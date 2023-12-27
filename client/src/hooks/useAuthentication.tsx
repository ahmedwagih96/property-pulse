import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setToken, signOut } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
function useAuthentication() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.user);

  const refreshToken = async () => {
    if (!accessToken) return;
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp as number).diff(dayjs()) < 1;
    if (isExpired) {
      const res = await fetch(`/api/auth/refresh`, { credentials: "include" });
      if (!res.ok) {
        // If the token refresh request is not successful, sign out
        dispatch(signOut());
        return { isAuthenticated: false, accessToken };
      }
      const data = await res.json();
      if (!data.success) {
        // If the token refresh request is not successful, sign out
        dispatch(signOut());
        return { isAuthenticated: false, accessToken };
      }
      // If the token refresh is successful, update user and token in the store
      dispatch(setToken(data.access_token));
      return { isAuthenticated: true, accessToken: data.access_token };
    }
    return { isAuthenticated: true, accessToken };
  };

  return { refreshToken };
}

export default useAuthentication;
