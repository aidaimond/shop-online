export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  phoneNumber: string;
  googleID: string;
  avatar: string;
}
export interface IProduct {
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  user: string;
  colors: [string];
  price: number;
  sale: number;
  gender: string;
  images: [string];
  datetime: string;
  composition: string;
}