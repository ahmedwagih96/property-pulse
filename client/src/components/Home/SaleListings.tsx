import { useEffect, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
import { ListingItem } from "..";
import { toast } from "react-toastify";
function SaleListings() {
  const [saleListings, setSaleListings] = useState<ListingsType[]>([]);
  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/property?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data.properties);
      } catch (error) {
        toast.error("something went wrong, please refresh page");
      }
    };
    fetchSaleListings();
  }, []);
  return (
    <>
      {saleListings && saleListings.length > 0 ? (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent places for sale
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SaleListings;
