const User = require("../models/User");
const CarListing = require("../models/CarListing");
const ContactMessage = require("../models/ContactMessage");

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const cars = await CarListing.countDocuments();
    const activeListings = await CarListing.countDocuments({ status: "active" });
    const pendingListings = await CarListing.countDocuments({ status: "pending" });
    const contactMessages = await ContactMessage.countDocuments();

    const viewsAgg = await CarListing.aggregate([
      { $group: { _id: null, v: { $sum: "$viewCount" } } },
    ]);
    const totalViews = viewsAgg[0]?.v || 0;

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const listingGrowth = await CarListing.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      users,
      cars,
      activeListings,
      pendingListings,
      contactMessages,
      totalViews,
      userGrowth,
      listingGrowth,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
