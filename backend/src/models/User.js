const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    image: String,
    googleId: { type: String, sparse: true },
    password: { type: String, default: null }, // ← اضافه شد
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

// hash پسورد قبل از save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// متد مقایسه پسورد
UserSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", UserSchema);