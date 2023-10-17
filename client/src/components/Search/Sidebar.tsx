import useSearch from "../../hooks/useSearch";
function Sidebar() {
  const { queries, handleQueries, handleSubmit } = useSearch();
  return (
    <aside className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap font-semibold">
            Search Property:
          </label>
          <input
            type="text"
            name="searchName"
            placeholder="Search..."
            className="border rounded-lg p-3 w-full"
            value={queries.searchName}
            onChange={handleQueries}
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <label className="font-semibold">Amenities:</label>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="parking"
              className="w-5"
              onChange={handleQueries}
              checked ={queries.parking}
              />
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input
              checked ={queries.furnished}
              type="checkbox"
              name="furnished"
              className="w-5"
              onChange={handleQueries}
            />
            <span>Furnished</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Type:</label>
          <select
            name="type"
            className="border rounded-lg p-3"
            value={queries.type}
            onChange={handleQueries}
          >
            <option value="">All</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Sort by:</label>
          <select
            name="sort"
            className="border rounded-lg p-3"
            value={queries.sort}
            onChange={handleQueries}
          >
            <option value="-createdAt">Latest</option>
            <option value="createdAt">Oldest</option>
            <option value="-regularPrice">Price high to low</option>
            <option value="regularPrice">Price low to hight</option>
            <option value="-bedrooms">Number of rooms</option>
          </select>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Search
        </button>
      </form>
    </aside>
  );
}
export default Sidebar;