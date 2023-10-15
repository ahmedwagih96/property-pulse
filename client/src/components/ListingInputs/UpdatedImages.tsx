type Props = {
  files: FileList | undefined;
  removeFile: (fileToRemove: File) => void;
  imageUrls: string[];
  deleteUploadedImages: (fileToBeRemoved: string) => void;
};

function UpdatedImages({
  files,
  removeFile,
  imageUrls,
  deleteUploadedImages,
}: Props) {
  return (
    <>
      {imageUrls.map((image) => (
        <div
          key={image}
          className="flex justify-between p-3 border items-center"
        >
          <img
            src={image}
            alt="listing image"
            className="w-20 h-20 object-contain rounded-lg"
          />
          <button
            type="button"
            className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
            onClick={() => deleteUploadedImages(image)}
          >
            Delete
          </button>
        </div>
      ))}

      {files
        ? Array.from(files).map((file) => (
            <div
              key={file.name}
              className="flex justify-between p-3 border items-center"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <button
                type="button"
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                onClick={() => removeFile(file)}
              >
                Delete
              </button>
            </div>
          ))
        : null}
    </>
  );
}

export default UpdatedImages;
