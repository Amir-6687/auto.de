const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const contactMessageController = require("../controllers/contactMessageController");

// auth
router.post("/sync-user", userController.syncGoogleUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

// contact
router.post("/contact-messages", contactMessageController.create);

// ✅ favorites - الان زیر requireInternal محافظت میشن
router.get("/users/:userId/favorites", userController.getFavorites);
router.post("/users/:userId/favorites", userController.addFavorite);
router.delete("/users/:userId/favorites/:carId", userController.removeFavorite);

module.exports = router;