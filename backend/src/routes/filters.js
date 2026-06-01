const express = require("express");
const Car = require("../models/CarListing");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});

    const types = [...new Set(cars.map(c => c.type))];
    const brands = [...new Set(cars.map(c => c.brand))];
    const fuels = [...new Set(cars.map(c => c.fuelType))];
    const gearboxes = [...new Set(cars.map(c => c.gearbox))];
    const models = [...new Set(cars.map(c => c.model))];

    res.json({ types, brands, fuels, gearboxes, models });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

