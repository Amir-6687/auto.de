const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const requireInternal = require("../middleware/requireInternal");

// ✅ همه routes با requireInternal محافظت میشن
router.post("/sync-google", requireInternal, userController.syncGoogleUser);
router.post("/login", requireInternal, userController.loginUser);
router.post("/register", requireInternal, userController.registerUser);

// ✅ favorites هم محافظت شده
router.get("/:userId/favorites", requireInternal, userController.getFavorites);
router.post("/:userId/favorites", requireInternal, userController.addFavorite);
router.delete("/:userId/favorites/:carId", requireInternal, userController.removeFavorite);

module.exports = router;