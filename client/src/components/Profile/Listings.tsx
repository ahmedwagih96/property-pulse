import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import useHandleListings from "../../hooks/useHandleListings";

function Listings() {
  const { handleDeleteListing } = useHandleListings();
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
      {currentUser?.properties?.map((listing) => (
        <div
          key={listing?._id}
          className="border rounded-lg p-3 flex justify-between items-center gap-4"
        >
          <Link to={`/listing/${listing?._id}`}>
            <img
              src={listing?.imageUrls[0]}
              alt="listing cover"
              className="h-16 w-16 object-contain"
            />
          </Link>
          <Link
            className="text-slate-700 font-semibold  hover:underline truncate flex-1"
            to={`/listing/${listing?._id}`}
          >
            <p>{listing?.name}</p>
          </Link>

          <div className="flex flex-col item-center">
            <button
              className="text-red-700 uppercase"
              onClick={() => handleDeleteListing(listing?._id)}
            >
              Delete
            </button>
            <Link to={`/update-listing/${listing?._id}`}>
              <button className="text-green-700 uppercase">Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Listings;
