import mongoose, {Types} from "mongoose";
import Category from "./Category";
import Brand from "./Brand";
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
  colors: [String],
  price: Number,
  sale: Number,
  composition: String,
  gender: String,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;