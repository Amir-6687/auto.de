const FeaturedCar = require("../models/FeaturedCar");
const CarListing = require("../models/CarListing");

// دریافت featured cars برای هر section
exports.getFeatured = async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section } : {};
    const featured = await FeaturedCar.find(filter)
      .sort({ order: 1 })
      .populate("carId", "title brand model price coverImage images")
      .lean();
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// اضافه کردن خودرو به section
exports.addFeatured = async (req, res) => {
  try {
    const { carId, section } = req.body;
    if (!carId || !section)
      return res.status(400).json({ error: "carId and section required" });

    const car = await CarListing.findById(carId);
    if (!car) return res.status(404).json({ error: "Car not found" });

    // چک کن قبلاً اضافه نشده باشه
    const exists = await FeaturedCar.findOne({ carId, section });
    if (exists) return res.status(409).json({ error: "Already featured in this section" });

    // محدودیت تعداد
    const count = await FeaturedCar.countDocuments({ section });
    if (section === "top4" && count >= 4)
      return res.status(400).json({ error: "Top 4 section is full (max 4)" });
    if (section === "carousel" && count >= 12)
      return res.status(400).json({ error: "Carousel is full (max 12)" });

    const order = count;
    const featured = await FeaturedCar.create({ carId, section, order });
    res.status(201).json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف از section
exports.removeFeatured = async (req, res) => {
  try {
    await FeaturedCar.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};