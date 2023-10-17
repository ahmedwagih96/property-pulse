import { Landing, RentListings, SaleListings } from "../components";
export default function Home() {
  return (
    <main>
      <Landing />
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 ">
        <SaleListings />
        <RentListings />
      </div>
    </main>
  );
}