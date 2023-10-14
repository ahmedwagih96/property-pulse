import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ListingDataForm } from "../types/typings";
import { uploadImage } from "../utils/uploadImage";
import {
  handleListingFormChange,
  updateFileList,
} from "../utils/CreateListingUtils";
import { initialCreateListingDataForm } from "../constants";
function useCreateListing() {
  const navigate = useNavigate();
  const [fileUploadError, setFileUploadError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<ListingDataForm>(
    initialCreateListingDataForm
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();
  const removeFile = (fileToRemove: File) => {
    if (!files) {
      return;
    }
    setFiles(updateFileList(files, fileToRemove));
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(handleListingFormChange(e, formData));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files?.length) return;
    if (files.length > 7) return;
    if (!formData.name || !formData.address) return;
    if (formData.regularPrice < formData.discountPrice) return;
    setLoading(true);
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
    try {
      setError("");
      const res = await fetch("/api/property/create", {
        method: "POST",
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
    fileUploadError,
    formData,
    loading,
    files,
    error,
  };
}
export default useCreateListing;
