import {
  Contact,
  ImageSlider,
  ListingDescription,
  ListingInfo,
  ShareButton,
} from "../components";
import useListing from "../hooks/useListing";
export default function Listing() {
  const { listing, loading } = useListing();
  return (
    <main>
      {loading ? <p className="text-center my-7 text-2xl">Loading...</p> : null}
      {listing ? (
        <>
          <ImageSlider imageUrls={listing.imageUrls} />
          <ShareButton />
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <ListingDescription listing={listing} />
            <ListingInfo listing={listing} />
            <Contact listing={listing} />
          </div>
        </>
      ) : null}
    </main>
  );
}
