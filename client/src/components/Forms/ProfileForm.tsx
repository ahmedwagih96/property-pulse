import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
function ProfileForm() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <form className="flex flex-col gap-4">
      <input type="file" hidden accept="image/*" />
      <img
        alt="profile"
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        src={currentUser?.avatar}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        className="border p-3 rounded-lg"
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        className="border p-3 rounded-lg"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        className="border p-3 rounded-lg"
      />
      <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
        Update
      </button>
      <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        to={"/create-listing"}
      >
        Create Listing
      </Link>
    </form>
  );
}

export default ProfileForm;
