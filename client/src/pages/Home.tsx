import { Link } from "react-router-dom";
import { Landing, RentListings, SaleListings, Seo } from "../components";
export default function Home() {
  return (
    <main>
      <Seo
        description="Property Pulse is a leading real estate agency that specializes in
        helping clients buy, sell, and rent properties in the most desirable
        neighborhoods."
        title="Home"
      />
      <Landing />
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 ">
        <SaleListings />
        <RentListings />
      </div>
      <div className="text-center m-8">
        <Link
          className="bg-slate-500 text-white py-3 px-6 text-center hover:opacity-80 duration-300 rounded-md inline-block"
          to="/search"
        >
          Browse All Listings
        </Link>
      </div>
    </main>
  );
}
