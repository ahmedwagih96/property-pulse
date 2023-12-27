import { ChangeEvent, FormEvent, useState } from "react";
import { SignInForm } from "../types/typings";
import { useAppDispatch } from "../redux/hooks";
import { signIn } from "../redux/features/userSlice";
function useSignIn() {
  const dispatch = useAppDispatch();
  const initialState = {
    password: "",
    email: "",
  };
  const [authForm, setAuthForm] = useState<SignInForm>(initialState);
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
    if (!authForm.email) {
      setError("Please provide an email");
      return;
    }
    if (!authForm.password) {
      setError("Please provide a password");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
        return;
      }
      if (data.success) {
        setError("");
        dispatch(signIn({ user: data.user, token: data.access_token }));
        setAuthForm(initialState);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return { handleChange, authForm, handleSubmit, loading, error };
}

export default useSignIn;
