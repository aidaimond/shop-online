import mongoose, {Types} from "mongoose";
import Product from "./Product";
import User from "./User";
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
  basketItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      validate: {
        validator: async (value: Types.ObjectId) => Product.findById(value),
        message: "Product does not exist",
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist',
    }
  },
  amount: {
    type: Number,
    required: true,
  }
});

const Basket = mongoose.model("Basket", BasketSchema);

export default Basket;