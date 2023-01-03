import mongoose from "mongoose";

const ContactSchema = mongoose.Schema;

const contactSchema = new ContactSchema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model("contact", contactSchema);
