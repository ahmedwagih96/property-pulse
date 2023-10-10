import { ChangeEvent, useState, FormEvent } from "react";
// Firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
// Typings
import { UpdatedUser } from "../types/typings";
// Redux
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateUser } from "../redux/features/userSlice";
function useUpdateProfile() {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //State
  const [file, setFile] = useState<File>();
  const [uploadFileProgress, setUploadFileProgress] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);
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

  const handleFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadFileProgress(Math.round(progress));
        },
        () => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile(undefined);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous errors
    setError("");
    // Validation
    if (!profileData.username || !profileData.email) {
      setError("Please provide a username and email");
      return;
    }

    try {
      setLoading(true);
      let avatar = "";
      if (file) {
        avatar = await handleFileUpload(file);
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
    file,
    profileData,
    handleChangeImage,
    handleChangeData,
    uploadFileProgress,
    fileUploadError,
    handleSubmit,
    loading,
    isUpdateSuccess,
    error,
  };
}

export default useUpdateProfile;
