import { ChangeEvent, FormEvent, useState } from "react";
import { SignUpForm } from "../types/typings";
import { useNavigate } from "react-router-dom";
// Redux
import { useAppDispatch } from "../redux/hooks";
import { signIn } from "../redux/features/userSlice";
function useSignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
    email: "",
  };
  const [authForm, setAuthForm] = useState<SignUpForm>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    if (!authForm.username) {
      setError("Please provide a username");
      return;
    }
    if (!authForm.email) {
      setError("Please provide an email");
      return;
    }
    if (!authForm.password) {
      setError("Please provide a password");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const res = await fetch(
        `/api/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authForm),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
        return;
      }
      setAuthForm(initialState);
      dispatch(signIn({ user: data.user, token: data.access_token }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return { handleChange, authForm, handleSubmit, loading, error };
}

export default useSignUp;
