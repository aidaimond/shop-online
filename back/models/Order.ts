import mongoose, {Types} from "mongoose";
import Product from "./Product";
import User from "./User";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  apartment: String,
  entrance: String,
  floor: String,
  notes: String,
  status: {
    type: String,
    required: true,
    default: 'collect',
    enum: ['collect', 'transit', 'delivered']
  },
  datetime: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;