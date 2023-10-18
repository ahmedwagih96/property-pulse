import { ChangeEvent, useState, FormEvent } from "react";
// Typings
import { UpdatedUser } from "../types/typings";
// Redux
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateUser } from "../redux/features/userSlice";
import { uploadImage } from "../utils/uploadImage";

function useUpdateProfile() {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  //State
  const [file, setFile] = useState<File>();
  const [fileUploadError, setFileUploadError] = useState<string>("");
  const [profileData, setProfileData] = useState<UpdatedUser>({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    e.target.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous errors
    setError("");
    // Validation
    if (profileData.username === currentUser?.username && profileData.email === currentUser.email && !profileData.password && !file) {
      setError("Please make some changes to update");
      return;
    }
    try {
      setLoading(true);
      let avatar = "";
      if (file) {
        await uploadImage(file)
          .then((result) => {
            if (result.downloadURL) {
              avatar = result.downloadURL;
            } else {
              const errorMessage = result.error
                ? result.error.message
                : "Unknown error";
              setFileUploadError(errorMessage);
            }
          })
          .catch(() => {
            setFileUploadError("Unexpected error occurred");
          });
      }
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...profileData, avatar }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      setLoading(false);
      setIsUpdateSuccess(true);
      setTimeout(() => {
        setIsUpdateSuccess(false);
      }, 3000);
      dispatch(updateUser(data.user));
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {
    handleChangeImage,
    handleChangeData,
    handleSubmit,
    file,
    profileData,
    fileUploadError,
    loading,
    isUpdateSuccess,
    error,
  };
}

export default useUpdateProfile;
