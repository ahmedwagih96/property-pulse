import { Link } from "react-router-dom";
import { ProfileActions, ProfileForm } from "../components";
export default function Profile() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <ProfileForm />
      <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 block mt-3"
        to={"/create-listing"}
      >
        Create Listing
      </Link>
      <ProfileActions />
      <button className="text-green-700 w-full">Show Listings</button>
    </div>
  );
}
