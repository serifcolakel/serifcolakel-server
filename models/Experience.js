import mongoose from "mongoose";

const ExperienceSchema = mongoose.Schema;

const experienceSchema = new ExperienceSchema({
  userId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("experience", experienceSchema);
