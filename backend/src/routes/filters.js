const express = require("express");
const Car = require("../models/CarListing");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});

    // ✅ فیکس: فیلد درست vehicleType است، نه type
    const types = [...new Set(cars.map(c => c.vehicleType).filter(Boolean))];
    const brands = [...new Set(cars.map(c => c.brand).filter(Boolean))];
    const fuels = [...new Set(cars.map(c => c.fuelType).filter(Boolean))];
    const gearboxes = [...new Set(cars.map(c => c.gearbox).filter(Boolean))];
    const models = [...new Set(cars.map(c => c.model).filter(Boolean))];

    res.json({ types, brands, fuels, gearboxes, models });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ جدید: لیست برند + مدل‌های هر برند (برای دراپ‌داون Marke und Modell)
router.get("/brands-models", async (req, res) => {
  try {
    const cars = await Car.find({}, "brand model");
    const map = {};
    cars.forEach((c) => {
      if (!c.brand) return;
      if (!map[c.brand]) map[c.brand] = new Set();
      if (c.model) map[c.brand].add(c.model);
    });
    const result = Object.entries(map).map(([brand, models]) => ({
      brand,
      models: [...models],
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ جدید: تعداد آگهی‌های هر نوع خودرو (Treffer count)
router.get("/count", async (req, res) => {
  try {
    const { vehicleType, brand, model } = req.query;
    const query = { status: "active" };
    if (vehicleType) query.vehicleType = new RegExp(`^${vehicleType}$`, "i");
    if (brand) query.brand = new RegExp(`^${brand}$`, "i");
    if (model) query.model = new RegExp(`^${model}$`, "i");

    const count = await Car.countDocuments(query);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;