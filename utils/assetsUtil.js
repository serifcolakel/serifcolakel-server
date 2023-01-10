export const handleImagePath = (path) => {
  return typeof path === "string" ? path.replace("public", "") : "";
};

export const fileFilter = (req, file, cb) => {
  console.log({ file });
  if (file) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};
