```js
// TODO (serif) : This is a example for uploading a single image with multer, it will be removed later
app.post("/upload", handleUploadAsset, (req, res) => {
  console.log(req.body.image); // we can return the image path to the client
  try {
    return res.status(200).json({
      status: STATUS.SUCCESS,
      message: "Image uploaded successfully",
      image: req.file.path.replace("public", ""),
    });
  } catch (error) {
    console.log(error);
  }
});
```
