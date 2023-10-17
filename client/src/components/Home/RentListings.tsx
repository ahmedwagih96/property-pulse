import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem } from "..";

function RentListings() {
  const [rentListings, setRentListings] = useState<ListingsType[]>([]);
  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/property?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data.properties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRentListings();
  }, []);
  return (
    <>
      {rentListings && rentListings.length > 0 ? (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent places for rent
            </h2>
            <Link
              className="text-sm text-blue-800 hover:underline"
              to={"/search?type=rent"}
            >
              Show more places for rent
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RentListings;
