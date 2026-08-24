const express = require('express');
const router = express.Router();
const controller = require('../controllers/carController');
const mongoose = require('mongoose');
const CarListing = require('../models/CarListing');
const requireInternal = require('../middleware/requireInternal');

// ✅ عمومی
router.get('/', controller.getAllCars);

// ✅ قبل از /:id + محافظت شده
router.get('/admin/:id', requireInternal, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const car = await CarListing.findById(id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ بعد از /admin/:id
router.get('/:id', controller.getCar);

// ✅ محافظت شده
router.post('/', requireInternal, controller.createCar);
router.put('/:id', requireInternal, controller.updateCar);
router.delete('/:id', requireInternal, controller.deleteCar);

module.exports = router;