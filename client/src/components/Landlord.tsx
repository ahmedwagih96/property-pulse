import { Link } from "react-router-dom";
import { ListingsType } from "../types/mongoTypes";

function Landlord({ listing }: { listing: ListingsType }) {
  return (
    <Link
      to={`/users/${listing.user?._id}`}
      className="text-sm font-semibold text-slate-700 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <img
          src={listing.user?.avatar}
          alt="owner profile"
          className="h-8 w-8 rounded-full object-cover cursor-pointer"
        />
        {listing.user.username}
      </div>
    </Link>
  );
}

export default Landlord;
