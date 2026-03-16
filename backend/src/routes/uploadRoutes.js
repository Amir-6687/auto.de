const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ذخیره موقت فایل‌ها روی دیسک
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      // مهم: همیشه آرایه برگردون
      return res.json({ urls: [] });
    }

    const urls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "auto-de",
        timeout: 60000,
      });

      urls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    res.json({ urls });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
