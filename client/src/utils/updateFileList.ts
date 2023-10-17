
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
