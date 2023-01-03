import mongoose from "mongoose";
import Joi from "joi";
const UserSchema = mongoose.Schema;

const userSchema = new UserSchema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  about: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://i.hizliresim.com/mn8lcf9.jpg",
  },
  date: {
    type: Date,
    default: Date.now,  
  },
})

export default mongoose.model("user", userSchema);