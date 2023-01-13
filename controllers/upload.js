import { STATUS } from "../common/constants.js";

export const handleUploadSingleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      status: STATUS.ERROR,
      message: "Please upload an image",
    });
  }

  res.status(200).send({
    status: STATUS.SUCCESS,
    message: "Upload image successfully",
    data: {
      image: req.file.path,
    },
  });
};

export const handleUploadMultipleImages = (req, res) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res.status(400).send({
      status: STATUS.ERROR,
      message: "Please upload an image",
    });
  }

  res.status(200).send({
    status: STATUS.SUCCESS,
    message: "Upload images successfully",
    data: {
      images: req.files.map((file) => file.path),
    },
  });
};
