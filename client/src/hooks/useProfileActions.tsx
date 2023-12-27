import { useState, FormEvent, ChangeEvent, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ListingDataForm } from "../types/typings";
// utils
import { uploadImage } from "../utils/uploadImage";
import {
  updateFileList,
  addFileToList,
  sortFileList,
} from "../utils/updateFileList";
import { handleFormInputs } from "../utils/handleFormInputs";
import { initialListingDataForm } from "../constants";
import { validateCreateListingForm } from "../utils/formValidations";
// Redux
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/userSlice";
import { DropResult } from "react-beautiful-dnd";
import useAuthentication from "./useAuthentication";
function useCreateListing() {
  const { refreshToken } = useAuthentication();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // state
  const [fileUploadError, setFileUploadError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<ListingDataForm>(
    initialListingDataForm
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();

  // remove selected files
  const removeFile = (fileToRemove: File) => {
    if (!files) {
      return;
    }
    setFiles(updateFileList(files, fileToRemove));
  };

  const addFiles = (filesToAdd: FileList) => {
    setFiles(addFileToList(files, filesToAdd));
  };

  function handleOnDragEnd(result: DropResult) {
    if (!files) return;
    setFiles(sortFileList(files, result));
  }

  // manage controlled form state
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(
      handleFormInputs(e, formData) as SetStateAction<ListingDataForm>
    );
  };

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    if (!files?.length) {
      setError("please upload at least 1 image");
      return;
    }
    const { error, validation } = validateCreateListingForm(formData, files);
    if (!validation) {
      setError(error);
      return;
    }
    setLoading(true);

    refreshToken().then(async (result) => {
      if (!result?.isAuthenticated) {
        setLoading(false);
        return;
      }
      const images: string[] = [];
      for (let i = 0; i < files.length; i++) {
        await uploadImage(files[i])
          .then((result) => {
            if (result.downloadURL) {
              images.push(result.downloadURL as string);
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
      try {
        setError("");
        const res = await fetch(`/api/property/create`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${result.accessToken}`,
          },
          body: JSON.stringify({
            ...formData,
            imageUrls: images,
          }),
        });
        const data = await res.json();
        setLoading(false);
        setFiles(undefined);
        setFormData(initialListingDataForm);
        if (!data.success) {
          setError(data.message);
        }
        dispatch(setUser(data.user));
        navigate(`/listing/${data.property._id}`);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    });
  };
  return {
    handleSubmit,
    removeFile,
    handleFormChange,
    addFiles,
    handleOnDragEnd,
    fileUploadError,
    formData,
    loading,
    files,
    error,
  };
}
export default useCreateListing;
