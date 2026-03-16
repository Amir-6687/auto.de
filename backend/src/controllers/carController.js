const CarListing = require("../models/CarListing");

// GET ALL
exports.getAllCars = async (req, res) => {
  try {
    const cars = await CarListing.find();
    res.json(cars);
  } catch (err) {
    console.error("GetAllCars Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getCar = async (req, res) => {
  try {
    const car = await CarListing.findById(req.params.id);
    res.json(car);
  } catch (err) {
    console.error("GetCar Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createCar = async (req, res) => {
  try {
    const car = await CarListing.create(req.body);
    res.json(car);
  } catch (err) {
    console.error("CreateCar Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE  ✅ نسخهٔ درست‌شده
exports.updateCar = async (req, res) => {
  try {
    const allowed = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      mileage: req.body.mileage,
      firstRegistration: req.body.firstRegistration,
      fuelType: req.body.fuelType,
      gearbox: req.body.gearbox,
      images: req.body.images,
      coverImage: req.body.coverImage,
    };

    const car = await CarListing.findByIdAndUpdate(req.params.id, allowed, {
      new: true,
    });

    res.json(car);
  } catch (err) {
    console.error("UpdateCar Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteCar = async (req, res) => {
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    console.error("DeleteCar Error:", err);
    res.status(500).json({ error: err.message });
  }
};
