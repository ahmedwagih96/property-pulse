import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
function HeaderNav() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <nav>
      <ul className="flex gap-4">
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About
          </li>
        </Link>
        {currentUser ? (
          <Link to="/profile">
            <img
              src={currentUser?.avatar}
              className="rounded-full h-7 w-7 object-cover"
            />
          </Link>
        ) : (
          <Link to="/sign-in">
            <li className=" text-slate-700 hover:underline"> Sign in</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
