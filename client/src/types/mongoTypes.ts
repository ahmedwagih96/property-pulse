import { ListingDataForm } from "./typings";

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

export interface ListingsType extends MongoType, ListingDataForm {
  user: UserType;
}
