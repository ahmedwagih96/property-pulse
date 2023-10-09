import { Link } from "react-router-dom";

function HeaderLogo() {
  return (
    <Link to="/">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className="text-slate-500">Property</span>
        <span className="text-slate-700">Pulse</span>
      </h1>
    </Link>
  );
}

export default HeaderLogo;
