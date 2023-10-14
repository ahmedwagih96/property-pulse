import { ChangeEvent } from "react";
import { ListingDataForm } from "../types/typings";

export const handleListingFormChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formData: ListingDataForm
) => {
  let newData = formData;
  const { name, type, value } = e.target;
  // handle sale and rent inputs
  if (name === "sale" || name === "rent") {
    newData = {
      ...newData,
      type: name,
    };
    return newData;
  }
  // handle checkbox inputs
  if (type === "checkbox") {
    newData = {
      ...newData,
      [name]: (e.target as HTMLInputElement).checked,
    };
    return newData;
  }
  // handle number inputs
  if (type === "number") {
    newData = {
      ...newData,
      [name]: Number(value),
    };
    return newData;
  }
  // other inputs
  newData = {
    ...newData,
    [name]: value,
  };
  return newData;
};

export const updateFileList = (files: FileList, fileToRemove: File) => {
  // Convert FileList to an array
  const filesArray = Array.from(files);
  // Filter out the file to remove
  const updatedFilesArray = filesArray.filter((file) => file !== fileToRemove);
  // Create a new DataTransfer object
  const dataTransfer = new DataTransfer();
  // Add each file to the DataTransfer object
  updatedFilesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });
  // Get the new FileList from the DataTransfer object
  const updatedList = dataTransfer.files;
  // Update the state with the new FileList
  return updatedList;
};
