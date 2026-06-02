const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const contactMessageController = require("../controllers/contactMessageController");

router.post("/sync-user", userController.syncGoogleUser);
router.post("/contact-messages", contactMessageController.create);
router.post("/login", userController.loginUser);       // ← اضافه شد
router.post("/register", userController.registerUser); // ← اضافه شد

module.exports = router;