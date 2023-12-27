import { useEffect, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem, LoadingSkeletons } from "..";
import { toast } from "react-toastify";
function RentListings() {
  const [rentListings, setRentListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/property?type=rent&limit=3");
        const data = await res.json();
        setRentListings(data.properties);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("something went wrong, please refresh page");
      }
    };

    fetchRentListings();
  }, []);

  return (
    <section>
      <h2 className="my-3 text-2xl font-semibold text-slate-600">
        Recent places for sale
      </h2>
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {loading ? (
          <LoadingSkeletons number={3} />
        ) : rentListings && rentListings.length > 0 ? (
          rentListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
        ) : (
          <p className="text-xl text-slate-700">
            There are currently no listings for rent!
          </p>
        )}
      </div>
    </section>
  );
}

export default RentListings;
