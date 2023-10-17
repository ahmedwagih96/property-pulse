import { ChangeEvent } from "react";
import { ListingDataForm, Queries } from "../types/typings";

export const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    formData: ListingDataForm | Queries
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
  