import express from "express";
import { uploadMultipleImages, uploadSingleImage } from "../config/upload.js";
import {
  handleUploadMultipleImages,
  handleUploadSingleImage,
} from "../controllers/upload.js";

const imageRouter = express.Router();

imageRouter.post("/single-image", uploadSingleImage, handleUploadSingleImage);

imageRouter.post(
  "/multiple-images",
  uploadMultipleImages,
  handleUploadMultipleImages
);

export default imageRouter;
