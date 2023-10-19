import { Seo, UpdateListingForm } from "../components";

function UpdateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <Seo
        description="Exclusively for Property Pulse members! List your property with confidence on our secure platform. Create a compelling listing to attract potential buyers or renters in the most desirable neighborhoods. Join our community of property owners and start the journey to a successful transaction!"
        title="Update Listing"
        canonicalUrl={`/update-listing`}
      />
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <UpdateListingForm />
    </main>
  );
}

export default UpdateListing;
