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
  properties: ListingsType[];
}

export interface ListingsType extends MongoType {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  user: UserType;
}
