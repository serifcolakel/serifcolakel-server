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
  gpas: {
    type: String,
    required: true,
  },
  educationType: {
    type: String, // Örgün veya İkinci Öğretim
    required: true,
  },
});