const CarListing = require("../models/CarListing");

exports.listAdminCars = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.brand) filter.brand = new RegExp(req.query.brand, "i");
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, "i") },
        { brand: new RegExp(req.query.search, "i") },
        { model: new RegExp(req.query.search, "i") },
      ];
    }
    const price = {};
    if (req.query.minPrice) price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) price.$lte = Number(req.query.maxPrice);
    if (Object.keys(price).length) filter.price = price;

    const total = await CarListing.countDocuments(filter);
    const cars = await CarListing.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("owner", "email name")
      .lean();

    res.json({
      cars,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.patchCarStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    if (!["pending", "active", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const update = {
      status,
      moderatedAt: new Date(),
    };
    if (status === "rejected") update.rejectionReason = rejectionReason || "";
    else update.rejectionReason = null;

    const car = await CarListing.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).populate("owner", "email name");
    if (!car) return res.status(404).json({ error: "Not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
