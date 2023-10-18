import { ListingDataForm } from "../types/typings";

export const validateCreateListingForm = (
  formData: ListingDataForm,
  files: FileList
) => {
  if (files.length > 7) {
    return { error: "please select only 6 images", validation: false };
  }
  return validateFields(formData);
};

export const validateUpdateListingForm = (
  formData: ListingDataForm,
  files: FileList | undefined
) => {
  if (!files?.length && !formData.imageUrls.length) {
    return { error: "please upload at least 1 image", validation: false };
  }
  if (formData.imageUrls.length + (files?.length ? files.length : 0) > 7) {
    return { error: "please select only 6 images", validation: false };
  }
  return validateFields(formData);
};

const validateFields = (formData: ListingDataForm) => {
  if (!formData.name) {
    return { error: "please write the listing name", validation: false };
  }
  if (!formData.description) {
    return { error: "please write the listing description", validation: false };
  }
  if (!formData.address) {
    return { error: "please write the address", validation: false };
  }
  if (formData.regularPrice < formData.discountPrice) {
    return {
      error: "discount price cannot be larger than the regular price",
      validation: false,
    };
  }
  return { error: "", validation: true };
};
