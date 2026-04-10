const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    image: String,
    googleId: { type: String, sparse: true },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "super_admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    googleLoginEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
