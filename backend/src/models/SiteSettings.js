const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true },
    logoUrl: String,
    contactEmail: String,
    contactPhone: String,
    themePrimary: String,
    themeAccent: String,
    footerText: String,
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);
