const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// --- موجود (اگه قبلاً جایی دیگه تعریف شده، این چندتا رو حذف کن) ---
router.post("/sync-google", userController.syncGoogleUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

// --- ✅ جدید: Favorites ---
router.get("/:userId/favorites", userController.getFavorites);
router.post("/:userId/favorites", userController.addFavorite);
router.delete("/:userId/favorites/:carId", userController.removeFavorite);

module.exports = router;