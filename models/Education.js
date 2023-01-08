import mongoose from "mongoose";

const EducationSchema = mongoose.Schema;

const educationSchema = new EducationSchema({
  userId: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  gpas: {
    type: String,
    required: true,
  },
  educationType: {
    type: String, // Örgün veya İkinci Öğretim
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("education", educationSchema);
