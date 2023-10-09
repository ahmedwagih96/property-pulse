import useSignIn from "../../hooks/useSignIn";
function SignInForm() {
  const { handleChange, authForm, handleSubmit, loading, error } = useSignIn();
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        className="border p-3 rounded-lg"
        onChange={handleChange}
        value={authForm.email}
        name="email"
      />
      <input
        value={authForm.password}
        onChange={handleChange}
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
        name="password"
      />

      <button
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      {error && <p className="text-red-500 mt-2 md:mt-5">{error}</p>}
    </form>
  );
}

export default SignInForm;
