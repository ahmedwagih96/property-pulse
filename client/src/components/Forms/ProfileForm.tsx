import { useAppSelector } from "../../redux/hooks";
import useUpdateProfile from "../../hooks/useUpdateProfile";

function ProfileForm() {
  const { currentUser } = useAppSelector((state) => state.user);
  const {
    handleChangeImage,
    fileUploadError,
    uploadFileProgress,
    file,
    profileData,
    handleChangeData,
    handleSubmit,
    loading,
    error,
    isUpdateSuccess,
  } = useUpdateProfile();
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="self-center ">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleChangeImage}
        />
        <img
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2"
          src={file ? URL.createObjectURL(file) : currentUser?.avatar}
        />
      </label>
      <p className="text-sm self-center">
        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : uploadFileProgress > 0 && uploadFileProgress < 100 ? (
          <span className="text-slate-700">{`Uploading ${uploadFileProgress}%`}</span>
        ) : uploadFileProgress === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : null}
      </p>
      <input
        onChange={handleChangeData}
        value={profileData.username}
        type="text"
        placeholder="username"
        name="username"
        className="border p-3 rounded-lg"
      />
      <input
        onChange={handleChangeData}
        value={profileData.email}
        type="email"
        placeholder="email"
        name="email"
        className="border p-3 rounded-lg"
      />
      <input
        onChange={handleChangeData}
        value={profileData.password}
        type="password"
        placeholder="password"
        name="password"
        className="border p-3 rounded-lg"
      />
      <button
        disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Loading..." : "Update"}
      </button>

      {error ? <p className="text-red-700 mt-5">{error}</p> : null}
      {isUpdateSuccess ? (
        <p className="text-green-700 mt-5">User is updated successfully!</p>
      ) : null}
    </form>
  );
}

export default ProfileForm;
