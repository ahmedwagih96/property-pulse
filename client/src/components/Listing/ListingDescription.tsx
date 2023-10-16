import { ListingsType } from "../../types/mongoTypes";
import { FaMapMarkerAlt } from "react-icons/fa";
function ListingDescription({ listing }: { listing: ListingsType }) {
  return (
    <>
      <p className="text-2xl font-semibold">
        {listing.name} - ${" "}
        {listing.offer
          ? listing.discountPrice.toLocaleString("en-US")
          : listing.regularPrice.toLocaleString("en-US")}
        {listing.type === "rent" && " / month"}
      </p>
      <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
        <FaMapMarkerAlt className="text-green-700" />
        {listing.address}
      </p>
      <div className="flex gap-4">
        <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
          {listing.type === "rent" ? "For Rent" : "For Sale"}
        </p>
        {listing.offer && (
          <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            ${+listing.regularPrice - +listing.discountPrice} OFF
          </p>
        )}
      </div>
      <p className="text-slate-800">
        <span className="font-semibold text-black">Description - </span>
        {listing.description}
      </p>
    </>
  );
}

export default ListingDescription;
