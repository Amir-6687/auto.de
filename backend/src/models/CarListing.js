const mongoose = require("mongoose");

const CarListingSchema = new mongoose.Schema(
  {
    // اصلی
    title: { type: String, required: true }, // می‌تونه ترکیب Marke + Modell باشه یا جدا نگه داریم
    description: String,
    price: Number,

    // جزئیات خودرو (مثل Kleinanzeigen)
    brand: String,              // Marke
    model: String,              // Modell
    mileage: Number,            // Kilometerstand
    condition: String,          // Fahrzeugzustand
    firstRegistration: String,  // Erstzulassung (مثلاً "März 2006")
    fuelType: String,           // Kraftstoffart
    power: Number,              // Leistung (PS)
    gearbox: String,            // Getriebe
    vehicleType: String,        // Fahrzeugtyp (Kombi, Limousine…)
    doors: String,              // Anzahl Türen (مثلاً "4/5")
    huUntil: String,            // HU bis (مثلاً "Januar 2028")
    emissionSticker: String,    // Umweltplakette (مثلاً "4 (Grün)")
    emissionClass: String,      // Schadstoffklasse (مثلاً "Euro 4")
    color: String,              // Außenfarbe

    // امکانات (Ausstattung)
    features: {
      type: [String],           // مثل: ["Einparkhilfe", "Klimaanlage", "Bluetooth", ...]
      default: [],
    },

    // گالری
    images: {
      type: [String],
      default: [],
    },
    coverImage: { type: String, default: null },

    // سینک با Kleinanzeigen (که خودت داشتی)
    kleinanzeigenAdId: { type: String, default: null },
    syncStatus: {
      type: String,
      enum: ["pending", "synced", "error"],
      default: "pending",
    },
    lastSyncError: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarListing", CarListingSchema);
