const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "auto-de",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
  },
});

const upload = multer({ storage });

router.post("/", (req, res) => {

  upload.array("images", 10)(req, res, (err) => {

    if (err) {
      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("FILES RECEIVED:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files received" });
    }

    try {
      const urls = req.files.map((file) => file.path);
      console.log("UPLOADED URLS:", urls);

      res.json({ urls });

    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({ error: error.message });
    }

  });

});

module.exports = router;

