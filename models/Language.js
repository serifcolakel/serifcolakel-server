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
  },
  level: {
    type: String,
    required: true,
  },
});

export default mongoose.model("language", languageSchema);
