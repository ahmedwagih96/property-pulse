import { Link } from "react-router-dom";
import { Seo, SignUpForm } from "../components";

function SignOut() {
  return (
    <main className="p-3 max-w-lg mx-auto">
      <Seo
        description="Create an account on Property Pulse to unlock a personalized real estate experience. Join our community and gain access to powerful tools for buying, selling, and renting properties."
        title="Sign Up"
        canonicalUrl="/signup"
      />
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <SignUpForm />
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </main>
  );
}

export default SignOut;
