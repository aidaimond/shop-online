import mongoose, {Types} from "mongoose";
import Product from "./Product";
import User from "./User";
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
  basketItems: [
    {product:     {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
        validate: {
          validator: async (value: Types.ObjectId) => Product.findById(value),
          message: "Product does not exist",
        },
      },
    amount: {
      type: Number,
      required: true,
      default: 1,
    }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist',
    }
  }
});

const Basket = mongoose.model("Basket", BasketSchema);

export default Basket;