import { Results, Seo, Sidebar } from "../components";
import useSearch from "../hooks/useSearch";
export default function Search() {
  const {
    handleSubmit,
    queries,
    handleQueries,
    loading,
    showMore,
    listings,
    fetchMoreListings,
  } = useSearch();
  return (
    <main className="flex flex-col md:flex-row">
      <Seo
        description="Discover a wide range of properties with Property Pulse's powerful search feature. Find your dream home, explore rental options, or discover investment opportunities in the most sought-after neighborhoods. Start your property search journey now!"
        title="Search"
        canonicalUrl={`/search`}
      />
      <Sidebar
        queries={queries}
        handleQueries={handleQueries}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Results
        listings={listings}
        loading={loading}
        showMore={showMore}
        fetchMoreListings={fetchMoreListings}
      />
    </main>
  );
}
