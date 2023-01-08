import multer from "multer";
import path from "path";

import { MAX_IMAGE_COUNT, MAX_IMAGE_SIZE } from "../common/constants.js";

import { fileFilter } from "../utils/assetsUtil.js";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "public/assets");
  },
  filename: function (_req, file, cb) {
    cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const uploadSingleImage = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
  fileFilter: fileFilter,
}).single("image");

export const uploadMultipleImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
}).array("images", MAX_IMAGE_COUNT);
