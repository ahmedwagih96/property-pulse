import { FaSearch } from "react-icons/fa";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function HeaderSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(
    searchParams.get("searchName") || ""
  );
  // Search Bar Submit
  const handleSearchBar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchName
      ? navigate(`/search?searchName=${searchName}`)
      : navigate("/search");
  };

  useEffect(() => {
    setSearchName(searchParams.get("searchName") || "");
  }, [searchParams]);
  return (
    <form
      className="bg-slate-100 p-3 rounded-lg flex items-center"
      onSubmit={handleSearchBar}
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-24 sm:w-64"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        name="searchName"
      />
      <button>
        <FaSearch className="text-slate-600" />
      </button>
    </form>
  );
}

export default HeaderSearch;
