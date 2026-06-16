const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    image: String,
    googleId: { type: String, sparse: true },
    password: { type: String, default: null },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "super_admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    googleLoginEnabled: { type: Boolean, default: true },
    // ✅ NEW: favorite car listings
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CarListing", default: [] },
    ],
  },
  { timestamps: true }
);

// ✅ بدون next
UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", UserSchema);