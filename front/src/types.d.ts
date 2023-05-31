export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Brand {
  title: string;
  description: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Subcategory {
  _id: string;
  title: string;
  category: Category;
}

export interface Product {
  _id: string;
  title: string;
  brand: Brand;
  category: Category;
  subcategory: Subcategory;
  user: User;
  colors: [string];
  price: number;
  sale: number;
  gender: string;
  images: [string];
  datetime: string;
  composition: string;
}

export interface ProductMutation {
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  colors: string;
  price: string;
  sale: string;
  gender: string;
  images: File | null;
  composition: string;
}

export interface Comment {
  _id: number;
  description: string;
}

export interface CommentsMutation {
  author: string;
  description: string;
}

