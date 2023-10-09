import useAuth from "../../hooks/useSignUp";
function SignUpForm() {
  const { handleChange, authForm, handleSubmit, loading, error } = useAuth();
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={authForm.username}
        name="username"
        type="text"
        placeholder="username"
        className="border p-3 rounded-lg"
      />
      <input
        onChange={handleChange}
        value={authForm.email}
        name="email"
        type="email"
        placeholder="email"
        className="border p-3 rounded-lg"
      />
      <input
        value={authForm.password}
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
      />

      <button
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      {error && <p className="text-red-500 mt-2 md:mt-5">{error}</p>}
    </form>
  );
}

export default SignUpForm;
