import mongoose, {Types} from "mongoose";
import Category from "./Category";

const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist',
    }
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

export default Subcategory;