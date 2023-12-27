import { useEffect, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem, LoadingSkeletons } from "..";
import { toast } from "react-toastify";
function SaleListings() {
  const [saleListings, setSaleListings] = useState<ListingsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/property?type=sale&limit=3");
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

  return (
    <section>
      <h2 className="my-3 text-2xl font-semibold text-slate-600">
        Recent places for sale
      </h2>
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {loading ? (
          <LoadingSkeletons number={3} />
        ) : saleListings && saleListings.length > 0 ? (
          saleListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
        ) : (
          <p className="text-xl text-slate-700">
            There are current no listings for sale!
          </p>
        )}
      </div>
    </section>
  );
}

export default SaleListings;
