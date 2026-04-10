const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminCarController = require("../controllers/adminCarController");
const contactMessageController = require("../controllers/contactMessageController");
const settingsController = require("../controllers/settingsController");
const statsController = require("../controllers/statsController");

router.get("/stats", statsController.getDashboard);

router.get("/users", userController.listUsers);
router.patch("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

router.get("/cars", adminCarController.listAdminCars);
router.delete("/cars/:id", adminCarController.deleteCar);
router.patch("/cars/:id/status", adminCarController.patchCarStatus);

router.get("/messages", contactMessageController.list);
router.patch("/messages/:id", contactMessageController.patch);
router.delete("/messages/:id", contactMessageController.remove);

router.get("/settings", settingsController.get);
router.put("/settings", settingsController.update);

module.exports = router;
