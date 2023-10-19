import { ListingItem } from "../components";
import useFetchUser from "../hooks/useFetchUser";

function User() {
  const { user, loading } = useFetchUser();
  return (
    <main className="max-w-6xl mx-auto p-4">
      {loading ? <p className="text-center my-7 text-2xl">Loading...</p> : null}
      {!loading && user ? (
        <>
          <div className="flex flex-col justify-center items-center my-4">
            <img
              src={user.avatar}
              alt="User Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <p className="text-gray-700 font-extrabold text-xl lg:text-2xl">
              {user.username}
            </p>
            <p className="text-gray-600 text-lg">
              Joined on:{" "}
              <span className="font-bold">
                {new Date(user.createdAt!).toDateString()}
              </span>
            </p>
            <p className="text-gray-600 text-lg">
              Email: <span className="font-bold">{user.email}</span>
            </p>
            <p className="text-gray-600 text-lg">
              Number of Listings:{" "}
              <span className="font-bold">{user.properties.length}</span>
            </p>
          </div>
          <h2 className="text-slate-500 font-bold text-xl lg:text-3xl">
            All Listings by <span className="text-slate-700">{user?.username}</span>
          </h2>
          {user?.properties?.length ? (
            <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {user.properties.map((property) => (
                <ListingItem key={property._id} listing={property} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-xl text-center mt-8">
              <span className="text-slate-700">{user?.username}</span> does not
              have any listings yet
            </p>
          )}
        </>
      ) : null}
    </main>
  );
}

export default User;
