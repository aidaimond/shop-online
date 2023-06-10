import ObjectId = module;

export interface IUser {
  email: string;
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
  color: string;
  price: number;
  image: string;
  datetime: string;
  composition: string;
}

export interface IComment {
  product: string;
  user: string;
  description: string;
}

export interface IBasket {
  product: ObjectId;
  amount: number;
}

export interface IOrder {
  basketItems: IBasket[],
  city: string;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  notes: string;
  user: string;
  datetime: string;
}