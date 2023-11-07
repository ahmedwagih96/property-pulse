import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useLocation } from "react-router-dom";
function HeaderNav() {
  const { currentUser } = useAppSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav>
      <ul className="flex gap-4">
        <Link to="/">
          <li className={`hidden sm:inline  hover:underline ${pathname === '/' ? 'text-slate-800 font-bold' : 'text-slate-600'}`}>
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className={`hidden sm:inline hover:underline ${pathname === '/about' ? 'text-slate-800 font-bold' : 'text-slate-600'}`}>
            About
          </li>
        </Link>
        {currentUser ? (
          <Link to="/profile">
            <img
              src={currentUser?.avatar}
              className="rounded-full h-7 w-7 object-cover"
              alt="User Avatar"
            />
          </Link>
        ) : (
          <Link to="/sign-in">
            <li className={`hover:underline ${pathname === '/sign-in' ? 'text-slate-800 font-bold' : 'text-slate-600'}`}> Sign in</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
