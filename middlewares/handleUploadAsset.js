import { uploadSingleImage } from "../config/upload.js";

import { RESULT } from "../common/constants.js";

import { handleImagePath } from "../utils/assetsUtil.js";

export const handleUploadAsset = (req, res, next) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({
        result: RESULT.ERROR,
        message: err.message,
      });
    }
    req.body.image = handleImagePath(req.file.path);
    next();
  });
};
