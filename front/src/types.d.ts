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
  _id: string;
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
  color: string;
  price: number;
  image: string;
  datetime: string;
  composition: string;
}

export interface ProductMutation {
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  color: string;
  price: string;
  image: File | null;
  composition: string;
}

export interface Comment {
  _id: number;
  product: Product;
  user: User;
  description: string;
}

export interface CommentsMutation {
  description: string;
}

export interface CommentWithProduct {
  product: string;
  description: string;
}

export interface Basket {
  product: Product;
}

