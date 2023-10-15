import { ListingDataForm } from "../../types/typings";

type Props = {
  formData: ListingDataForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function NumberInputs({ formData, handleChange }: Props) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center gap-2">
        <input
          type="number"
          name="bedrooms"
          min="1"
          max="10"
          required
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
          value={formData.bedrooms}
        />
        <p>Beds</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          name="bathrooms"
          min="1"
          max="10"
          required
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
          value={formData.bathrooms}
        />
        <p>Baths</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          name="regularPrice"
          min="50"
          max="10000000"
          required
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
          value={formData.regularPrice}
        />
        <div className="flex flex-col items-center">
          <p>Regular price</p>
          {formData.type === "rent" ? (
            <span className="text-xs">($ / month)</span>
          ) : null}
        </div>
      </div>
      {formData.offer ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="discountPrice"
            min="0"
            max="10000000"
            required
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.discountPrice}
          />
          <div className="flex flex-col items-center">
            <p>Discounted price</p>

            {formData.type === "rent" && (
              <span className="text-xs">($ / month)</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NumberInputs;
