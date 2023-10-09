import { HeaderLogo, HeaderNav, HeaderSearch } from "..";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <HeaderLogo />
        <HeaderSearch />
        <HeaderNav />
      </div>
    </header>
  );
}

export default Header;
