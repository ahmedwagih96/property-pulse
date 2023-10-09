function SignInForm() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="email"
        className="border p-3 rounded-lg"
        id="email"
      />
      <input
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
        id="password"
      />

      <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
