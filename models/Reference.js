import mongoose from "mongoose";

const ReferenceSchema = mongoose.Schema;

const referenceSchema = new ReferenceSchema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("reference", referenceSchema);
