import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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
    </div>
  );
};

export default NotFound;
