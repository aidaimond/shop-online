import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;