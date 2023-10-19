import { Link } from "react-router-dom";
import { Seo } from "../components";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Seo
        description="Oops! It seems like the page you're looking for doesn't exist. Property Pulse can help you find your way back home or explore other exciting real estate opportunities. Navigate with us to discover your next property adventure!"
        title="Not Found"
        canonicalUrl={`/404`}
      />
      <div className="flex flex-col gap-6 pt-28 pb-8 px-3 max-w-6xl mx-auto text-center">
        <h1 className="text-red-500 font-bold text-3xl lg:text-6xl">
          Oops! Page not found
        </h1>
        <div className="text-gray-500 text-sm">
          It seems like you've wandered into the unknown.
          <br />
          The page you're looking for doesn't exist.
        </div>
        <Link
          to="/"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Go back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
