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
