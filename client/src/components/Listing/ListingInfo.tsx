import { ListingsType } from "../../types/mongoTypes";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";

function ListingInfo({ listing }: { listing: ListingsType }) {
  return (
    <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
      <li className="flex items-center gap-1 whitespace-nowrap ">
        <FaBed className="text-lg" />
        {listing.bedrooms > 1
          ? `${listing.bedrooms} beds `
          : `${listing.bedrooms} bed `}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap ">
        <FaBath className="text-lg" />
        {listing.bathrooms > 1
          ? `${listing.bathrooms} baths `
          : `${listing.bathrooms} bath `}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap ">
        <FaParking className="text-lg" />
        {listing.parking ? "Parking spot" : "No Parking"}
      </li>
      <li className="flex items-center gap-1 whitespace-nowrap ">
        <FaChair className="text-lg" />
        {listing.furnished ? "Furnished" : "Unfurnished"}
      </li>
    </ul>
  );
}

export default ListingInfo;
