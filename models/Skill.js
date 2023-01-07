import mongoose from "mongoose";

const SkillSchema = mongoose.Schema;

const skillSchema = new SkillSchema({
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
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("skill", skillSchema);
