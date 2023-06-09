import mongoose, {Types} from "mongoose";
import Category from "./Category";
import Brand from "./Brand";
import User from "./User";
import Subcategory from "./Subcategory";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Brand.findById(value),
      message: 'Brand does not exist',
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist',
    }
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    validate: {
      validator: async (value: Types.ObjectId) => Subcategory.findById(value),
      message: 'SubCategory does not exist',
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist',
    }
  },
  color:  {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required:true,
  },
  image: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;