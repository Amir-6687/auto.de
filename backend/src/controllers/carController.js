const CarListing = require('../models/CarListing');

// GET all
exports.getAllCars = async (req, res) => {
  try {
    const cars = await CarListing.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one
exports.getCar = async (req, res) => {
  try {
    const car = await CarListing.findById(req.params.id);
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createCar = async (req, res) => {
  try {
    const car = await CarListing.create(req.body);
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCar = async (req, res) => {
  try {
    const car = await CarListing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteCar = async (req, res) => {
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
