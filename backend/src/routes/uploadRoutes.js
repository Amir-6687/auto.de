const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const requireInternal = require("../middleware/requireInternal");

// ✅ محدودیت حجم (5MB) و نوع فایل
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per file
    files: 10,                  // max 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG and WebP images are allowed"));
    }
  },
});

// ✅ محافظت با requireInternal + محدودیت فایل
router.post("/", requireInternal, upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.json({ urls: [] });
    }

    const urls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "auto-de",
        timeout: 60000,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      });

      urls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    res.json({ urls });
  } catch (err) {
    // ✅ پاک کردن فایل‌های موقت در صورت خطا
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ handler خطای multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ error: "File too large. Max 5MB per image." });
    if (err.code === "LIMIT_FILE_COUNT")
      return res.status(400).json({ error: "Too many files. Max 10 images." });
  }
  if (err) return res.status(400).json({ error: err.message });
  next();
});

module.exports = router;