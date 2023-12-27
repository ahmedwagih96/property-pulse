import { DropResult } from "react-beautiful-dnd";

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

export const addFileToList = (
  existingFiles: FileList | undefined,
  filesToAdd: FileList
) => {
  // Convert FileList to an array or use an empty array if undefined
  const existingFilesArray = existingFiles ? Array.from(existingFiles) : [];

  // Convert FilesToAdd to an array
  const additionalFilesArray = Array.from(filesToAdd);

  // Check for duplicates by file name
  const uniqueFilesArray = additionalFilesArray.filter((file) => {
    return !existingFilesArray.some(
      (existingFile) => existingFile.name === file.name
    );
  });

  // Concatenate the arrays
  const updatedFilesArray = existingFilesArray.concat(uniqueFilesArray);

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

export const sortFileList = (files: FileList, result: DropResult) => {
  if (!result.destination) return files;
  // Convert FileList to an array
  const filesArray = Array.from(files);
  const [reorderedItem] = filesArray.splice(result.source.index, 1);
  filesArray.splice(result.destination.index, 0, reorderedItem);
  const dataTransfer = new DataTransfer();
  // Add each file to the DataTransfer object
  filesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });
  // Get the new FileList from the DataTransfer object
  const updatedList = dataTransfer.files;
  // Update the state with the new FileList
  return updatedList;
};
