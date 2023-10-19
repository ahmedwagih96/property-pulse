import { Results, Seo, Sidebar } from "../components";
export default function Search() {
  return (
    <main className="flex flex-col md:flex-row">
      <Seo
       description="Discover a wide range of properties with Property Pulse's powerful search feature. Find your dream home, explore rental options, or discover investment opportunities in the most sought-after neighborhoods. Start your property search journey now!"
        title="Search"
        canonicalUrl={`/search`}
      />
      <Sidebar />
      <Results />
    </main>
  );
}
