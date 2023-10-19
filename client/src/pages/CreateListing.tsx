import { CreateListingForm, Seo } from "../components";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <Seo title="Create Listing" canonicalUrl={`/create-listing`} />
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <CreateListingForm />
    </main>
  );
}
