import { ListingItem, LoadingSkeletons, Pagination } from "../";
import { ListingsType } from "../../types/mongoTypes";

type ResultsProps = {
  listings: ListingsType[];
  loading: boolean;
  showMore: boolean;
  fetchMoreListings: () => void;
  count: number
};
function Results({
  listings,
  loading,
  showMore,
  fetchMoreListings,
  count
}: ResultsProps) {
  return (
    <div className="flex-1 relative">
      <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
        Listing results:
      </h1>
      <div className="p-7 flex flex-wrap gap-4">
        {loading ? <LoadingSkeletons number={8} /> : null}
        {!loading && listings.length === 0 ? (
          <p className="text-xl text-slate-700">No listing found!</p>
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
      <Pagination count = {count}/>
    </div>
  );
}
export default Results;
