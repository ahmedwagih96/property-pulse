import { ListingDataForm } from "../../types/typings";

type Props = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: ListingDataForm;
};

function CheckboxInputs({ handleChange, formData }: Props) {
  return (
    <div className="flex gap-6 flex-wrap">
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="sale"
          className="w-5"
          onChange={handleChange}
          checked={formData.type === "sale"}
        />
        <span>Sell</span>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="rent"
          className="w-5"
          onChange={handleChange}
          checked={formData.type === "rent"}
        />
        <span>Rent</span>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="parking"
          className="w-5"
          onChange={handleChange}
          checked={formData.parking}
        />
        <span>Parking spot</span>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="furnished"
          className="w-5"
          onChange={handleChange}
          checked={formData.furnished}
        />
        <span>Furnished</span>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="offer"
          className="w-5"
          onChange={handleChange}
          checked={formData.offer}
        />
        <span>Offer</span>
      </div>
    </div>
  );
}

export default CheckboxInputs;
