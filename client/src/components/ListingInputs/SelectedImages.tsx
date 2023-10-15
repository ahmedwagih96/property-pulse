type Props = {
  files: FileList;
  removeFile: (fileToRemove: File) => void;
};

function SelectedImages({ files, removeFile }: Props) {
  return (
    <>
      {Array.from(files).map((file) => (
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
      ))}
    </>
  );
}

export default SelectedImages;
