import { Link } from "react-router-dom";
import { Seo, SignInForm } from "../components";

function SignIn() {
  return (
    <main className="p-3 max-w-lg mx-auto">
      <Seo
        description="Sign in to Property Pulse to access your account. Explore exclusive features for registered users and manage your property transactions with ease."
        title="Sign In"
        canonicalUrl="/signin"
      />
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <SignInForm />
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </main>
  );
}

export default SignIn;
