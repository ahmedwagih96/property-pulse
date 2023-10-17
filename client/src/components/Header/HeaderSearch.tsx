import { FaSearch } from "react-icons/fa";
import useSearch from "../../hooks/useSearch";
function HeaderSearch() {
  const { queries, handleSearchBar, handleQueries } = useSearch();
  return (
    <form
      className="bg-slate-100 p-3 rounded-lg flex items-center"
      onSubmit={handleSearchBar}
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-24 sm:w-64"
        value={queries.searchName}
        onChange={handleQueries}
        name="searchName"
      />
      <button>
        <FaSearch className="text-slate-600" />
      </button>
    </form>
  );
}

export default HeaderSearch;
