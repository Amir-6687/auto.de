const mongoose = require("mongoose");

const FeaturedCarSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "CarListing", required: true },
    section: {
      type: String,
      enum: ["carousel", "top4"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedCar", FeaturedCarSchema);