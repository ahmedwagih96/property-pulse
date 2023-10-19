import { useEffect, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem, LoadingSpinner } from "..";
import { toast } from "react-toastify";
function RentListings() {
  const [rentListings, setRentListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/property?type=rent&limit=4");
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

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {rentListings && rentListings.length > 0 ? (
        <section>
          <h2 className="my-3 text-2xl font-semibold text-slate-600">
            Recent places for rent
          </h2>
          <div className="flex flex-wrap gap-4">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default RentListings;
