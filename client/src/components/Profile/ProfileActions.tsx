import useProfileActions from "../../hooks/useProfileActions";

function ProfileActions() {
  const { handleDeleteAccount, error, signOutUser } = useProfileActions();
  return (
    <>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={signOutUser}>
          Sign out
        </span>
      </div>
      {error ? <p className="text-red-700 mt-5">{error}</p> : null}
    </>
  );
}

export default ProfileActions;
