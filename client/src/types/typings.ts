export interface SignUpForm {
  username: string;
  password: string;
  email: string;
}
export interface SignInForm {
  password: string;
  email: string;
}

export interface MongoType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserType extends MongoType {
  email: string;
  username: string;
  avatar: string;
}

export interface UpdatedUser {
  email: string;
  password?: string;
  username: string;
  avatar?: string;
}

export interface ListingDataForm {
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  bedrooms: number;
  bathrooms: number;
  regularPrice: number;
  discountPrice: number;
}
