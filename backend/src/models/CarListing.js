const mongoose = require('mongoose');

const CarListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    mileage: Number,
    firstRegistration: Date,
    fuelType: String,
    gearbox: String,
    images: {
      type: [String], // آرایه‌ای از URL عکس‌ها
      default: [],
    },

    // برای سینک با Kleinanzeigen
    kleinanzeigenAdId: { type: String, default: null },
    syncStatus: {
      type: String,
      enum: ['pending', 'synced', 'error'],
      default: 'pending'
    },
    lastSyncError: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('CarListing', CarListingSchema);
