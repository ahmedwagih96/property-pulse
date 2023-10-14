import { ListingDataForm } from "../../types/typings";

type Props = {
  formData: ListingDataForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
function TextInputs({ formData, handleChange }: Props) {
  return (
    <>
      <input
        value={formData.name}
        type="text"
        placeholder="Name"
        className="border p-3 rounded-lg"
        name="name"
        maxLength={62}
        minLength={10}
        required
        onChange={handleChange}
      />
      <textarea
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-3 rounded-lg"
        name="description"
        required
      />
      <input
        value={formData.address}
        onChange={handleChange}
        type="text"
        placeholder="Address"
        className="border p-3 rounded-lg"
        name="address"
        required
      />
    </>
  );
}

export default TextInputs;
