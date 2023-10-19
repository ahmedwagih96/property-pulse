import { useState } from "react";
import { Link } from "react-router-dom";
import { Listings, ProfileActions, ProfileForm, Seo } from "../components";
export default function Profile() {
  const [showListings, setShowListings] = useState<boolean>(false);
  return (
    <main className="p-3 max-w-lg mx-auto">
      <Seo
       description={`Manage your listings and update your profile on Property Pulse. Explore and edit property details, keep your listings current, and ensure your personal information is up-to-date. Experience personalized control over your real estate journey with Property Pulse.`}
        title='Your Profile'
        canonicalUrl={`/profile`}
      />
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <ProfileForm />
      <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 block mt-3"
        to={"/create-listing"}
      >
        Create Listing
      </Link>
      <ProfileActions />
      <button
        className="text-green-700 w-full"
        onClick={() => setShowListings((prev) => !prev)}
      >
        {showListings ? "Hide Listings" : "Show Listings"}
      </button>
      {showListings ? <Listings /> : null}
    </main>
  );
}
