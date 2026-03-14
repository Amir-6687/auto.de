const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "auto-de",
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images", 10), (req, res) => {
    const urls = req.files.map((file) => file.path);
    res.json({ urls });
  });
  
module.exports = router;
