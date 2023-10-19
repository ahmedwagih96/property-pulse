import { ListingItem, LoadingSpinner } from "../";
import useFetchListings from "../../hooks/useFetchListings";
function Results() {
  const { listings, loading, showMore, fetchMoreListings } = useFetchListings();
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
        Listing results:
      </h1>
      <div className="p-7 flex flex-wrap gap-4">
        {!loading && listings.length === 0 ? (
          <p className="text-xl text-slate-700">No listing found!</p>
        ) : null}
        {loading ? (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        ) : null}
        {!loading && listings
          ? listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          : null}
        {showMore ? (
          <button
            onClick={fetchMoreListings}
            className="text-green-700 hover:underline p-7 text-center w-full"
          >
            Show more
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default Results;
