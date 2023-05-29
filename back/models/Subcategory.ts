import mongoose, {Types} from "mongoose";
import Category from "./Category";

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
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

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;