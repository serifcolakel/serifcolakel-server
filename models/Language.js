import mongoose from "mongoose";

const LanguageSchema = mongoose.Schema;

const languageSchema = new LanguageSchema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("language", languageSchema);
