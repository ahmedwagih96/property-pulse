import { CheckboxInputs, NumberInputs, TextInputs, UpdatedImages } from "..";
import useUpdateListing from "../../hooks/useUpdateListing";

function UpdateListingForm() {
  const {
    setFiles,
    handleSubmit,
    loading,
    files,
    formData,
    removeFile,
    handleFormChange,
    error,
    fileUploadError,
    deleteUploadedImages,
  } = useUpdateListing();
  return (
    <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 flex-1">
        <TextInputs handleChange={handleFormChange} formData={formData} />
        <CheckboxInputs handleChange={handleFormChange} formData={formData} />
        <NumberInputs handleChange={handleFormChange} formData={formData} />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <p className="font-semibold">
          Images:
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>
        </p>
        <div className="flex gap-4">
          <input
            className="p-3 border border-gray-300 rounded"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && setFiles(e.target.files)}
          />
          {fileUploadError ? (
            <p className="text-red-700 text-sm">{fileUploadError}</p>
          ) : null}
        </div>

        <UpdatedImages
          files={files}
          removeFile={removeFile}
          deleteUploadedImages={deleteUploadedImages}
          imageUrls={formData.imageUrls}
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update listing"}
        </button>
        {error ? <p className="text-red-700 text-sm">{error}</p> : null}
      </div>
    </form>
  );
}
export default UpdateListingForm;
