import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAppDispatch } from "../redux/hooks";
import { signIn } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signIn({ user: data.user, token: data.access_token }));
      navigate("/");
    } catch (error) {
      toast.error("could not sign in with google");
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
}

export default OAuth;
