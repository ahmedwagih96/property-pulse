import { useEffect, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem, LoadingSpinner } from "..";
import { toast } from "react-toastify";
function SaleListings() {
  const [saleListings, setSaleListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/property?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data.properties);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("something went wrong, please refresh page");
      }
    };
    fetchSaleListings();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {saleListings && saleListings.length > 0 ? (
        <section>
          <h2 className="my-3 text-2xl font-semibold text-slate-600">
            Recent places for sale
          </h2>
          <div className="flex flex-wrap gap-4">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default SaleListings;
