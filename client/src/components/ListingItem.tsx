import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { ListingsType } from "../types/mongoTypes";

export default function ListingItem({ listing }: { listing: ListingsType }) {
  return (
    <div className="bg-white  hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] p-3 flex flex-col gap-3">
      <img
        src={listing.imageUrls[0]}
        alt="listing cover"
        className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={listing.user?.avatar}
            alt="owner profile"
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
          />
          <Link
            to={`/users/${listing.user?._id}`}
            className="text-sm font-semibold text-slate-700 cursor-pointer"
          >
            {listing.user.username}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700">
          {listing.name}
        </p>
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600 truncate w-full">
            {listing.address}
          </p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>
        <p className="text-slate-500 mt-2 font-semibold ">
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" ? " / month" : null}
        </p>
        <div className="text-slate-700 flex gap-4">
          <div className="font-bold text-xs">
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds `
              : `${listing.bedrooms} bed `}
          </div>
          <div className="font-bold text-xs">
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths `
              : `${listing.bathrooms} bath `}
          </div>
        </div>
      </div>
      <Link
        to={`/listing/${listing._id}`}
        className="bg-slate-500 text-white py-2 px-4 text-center hover:opacity-80 duration-300 rounded-md inline-block w-fit"
      >
        View More
      </Link>
    </div>
  );
}
