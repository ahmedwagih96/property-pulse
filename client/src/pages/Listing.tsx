import {
  Contact,
  ImageSlider,
  ListingDescription,
  ListingInfo,
  Seo,
  ShareButton,
} from "../components";
import useListing from "../hooks/useListing";
export default function Listing() {
  const { listing, loading } = useListing();
  return (
    <main>
      <Seo
        description={`Explore details of ${listing?.name} on Property Pulse. Discover key features, photos, and information about this property. Find your perfect home, investment, or rental opportunity in the most desirable neighborhoods.`}
        title={listing ? listing.name : ""}
        canonicalUrl={`/listing/${listing?._id}`}
      />
      {loading ? <p className="text-center my-7 text-2xl">Loading...</p> : null}
      {listing ? (
        <>
          <ImageSlider imageUrls={listing.imageUrls} />
          <ShareButton />
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2">
            <ListingDescription listing={listing} />
            <ListingInfo listing={listing} />
            <Contact listing={listing} />
          </div>
        </>
      ) : null}
    </main>
  );
}
