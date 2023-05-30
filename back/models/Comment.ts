import mongoose, {Types} from "mongoose";
import Product from "./Product";
import User from "./User";
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Product.findById(value),
      message: 'Product does not exist',
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
  description: {
    type: String,
    required: true,
  }
});

const Comment = mongoose.model("Comment", CommentsSchema);

export default Comment;