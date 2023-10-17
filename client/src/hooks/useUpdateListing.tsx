import {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  SetStateAction,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
// utils
import { uploadImage } from "../utils/uploadImage";
import { updateFileList } from "../utils/updateFileList";
// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/features/userSlice";
import { initialListingDataForm } from "../constants";
import { ListingDataForm } from "../types/typings";
import { handleFormInputs } from "../utils/handleFormInputs";

function useUpdateListing() {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState<ListingDataForm>(
    initialListingDataForm
  );

  useEffect(() => {
    const fetchListing = async () => {
      const id = params.id;
      const res = await fetch(`/api/property/${id}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      if (data.property.user !== currentUser?._id) {
        navigate("/");
      }
      delete data.property.user;
      setFormData(data.property);
    };
    fetchListing();
  }, [params, currentUser, navigate]);

  const [fileUploadError, setFileUploadError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();

  const deleteUploadedImages = (fileToBeRemoved: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((image) => image !== fileToBeRemoved),
    }));
  };
  const removeFile = (fileToRemove: File) => {
    if (!files) {
      return;
    }
    setFiles(updateFileList(files, fileToRemove));
  };
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(
      handleFormInputs(e, formData) as SetStateAction<ListingDataForm>
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files?.length && !formData.imageUrls.length) return;
    if (formData.imageUrls.length + (files?.length ? files.length : 0) > 7)
      return;
    if (!formData.name || !formData.address) return;
    if (formData.regularPrice < formData.discountPrice) return;
    // setLoading(true);
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        await uploadImage(files[i])
          .then((result) => {
            if (result.downloadURL) {
              formData.imageUrls.push(result.downloadURL);
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
    }
    try {
      setError("");
      setLoading(true);
      const id = params.id;
      const res = await fetch(`/api/property/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
      }
      dispatch(setUser(data.user));
      navigate(`/`);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return {
    setFiles,
    handleSubmit,
    removeFile,
    handleFormChange,
    deleteUploadedImages,
    fileUploadError,
    formData,
    loading,
    files,
    error,
  };
}
export default useUpdateListing;
