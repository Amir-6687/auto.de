const express = require('express');
const router = express.Router();
const controller = require('../controllers/carController');
const mongoose = require('mongoose'); // ✅ اضافه شد
const CarListing = require('../models/CarListing'); // ✅ اضافه شد

router.get('/', controller.getAllCars);

// ✅ route مخصوص admin - بدون چک status
router.get('/admin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const car = await CarListing.findById(id);
    
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', controller.getCar);
router.post('/', controller.createCar);
router.put('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

module.exports = router;