import mongoose, {Types} from "mongoose";
import Product from "./Product";
import User from "./User";
import Address from "./Address";
const Schema = mongoose.Schema;

const PickupSchema = new Schema({
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
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Address.findById(value),
      message: 'Address does not exist',
    }
  },
  status: {
    type: String,
    required: true,
    default: 'booked',
    enum: ['booked', 'purchased']
  },
  datetime: {
    type: String,
    required: true,
  },
});

const Pickup = mongoose.model("Pickup", PickupSchema);

export default Pickup;