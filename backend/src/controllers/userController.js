const User = require("../models/User");
const CarListing = require("../models/CarListing");

const ADMIN_EMAIL =
  (process.env.ADMIN_EMAIL || "amirhossein.akbari.de@gmail.com").toLowerCase();

exports.syncGoogleUser = async (req, res) => {
  try {
    const { email, name, image, googleId } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    const em = String(email).toLowerCase().trim();
    const isAdminEmail = em === ADMIN_EMAIL;

    let user = await User.findOne({ email: em });
    if (!user) {
      user = await User.create({
        email: em,
        name,
        image,
        googleId,
        role: isAdminEmail ? "admin" : "user",
      });
    } else {
      if (name) user.name = name;
      if (image) user.image = image;
      if (googleId && !user.googleId) user.googleId = googleId;
      if (isAdminEmail && user.role === "user") user.role = "admin";
      await user.save();
    }

    return res.json({ id: user._id.toString(), role: user.role });
  } catch (err) {
    console.error("syncGoogleUser", err);
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const search = req.query.search || "";
    const filter = {};
    if (search) {
      filter.$or = [
        { email: new RegExp(search, "i") },
        { name: new RegExp(search, "i") },
      ];
    }
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const ids = users.map((u) => u._id);
    const counts = await CarListing.aggregate([
      { $match: { owner: { $in: ids } } },
      { $group: { _id: "$owner", count: { $sum: 1 } } },
    ]);
    const countMap = Object.fromEntries(
      counts.map((c) => [c._id.toString(), c.count])
    );

    const enriched = users.map((u) => ({
      ...u,
      listingsCount: countMap[u._id.toString()] || 0,
    }));

    res.json({
      users: enriched,
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

exports.updateUser = async (req, res) => {
  try {
    const { role, isActive, googleLoginEnabled } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    if (role && ["user", "admin", "moderator", "super_admin"].includes(role)) {
      user.role = role;
    }
    if (typeof isActive === "boolean") user.isActive = isActive;
    if (typeof googleLoginEnabled === "boolean") user.googleLoginEnabled = googleLoginEnabled;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
