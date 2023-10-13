import { Checkbox, NumberInput } from "..";

function CreateListingForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-4 flex-1">
        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded-lg"
          name="name"
          maxLength={62}
          minLength={10}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-3 rounded-lg"
          name="description"
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-3 rounded-lg"
          name="address"
          required
        />
        <div className="flex gap-6 flex-wrap">
          <Checkbox title="Sell" name={"sell"} />
          <Checkbox title="Rent" name={"rent"} />
          <Checkbox title="Parking Spot" name={"parking"} />
          <Checkbox title="Furnished" name={"furnished"} />
          <Checkbox title="Offer" name={"offer"} />
        </div>
        <div className="flex flex-wrap gap-6">
          <NumberInput name="bedrooms" title="Beds" />
          <NumberInput name="bathrooms" title="Baths" />
          <NumberInput
            name="bathrooms"
            min={50}
            max={10000000}
            title="Regular Price"
          />
        </div>
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
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            name="images"
            accept="image/*"
            multiple
          />
          <button
            type="button"
            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
          >
            Upload
          </button>
        </div>

        <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Create listing
        </button>
      </div>
    </form>
  );
}
export default CreateListingForm;
