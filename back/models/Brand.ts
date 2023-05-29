import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;