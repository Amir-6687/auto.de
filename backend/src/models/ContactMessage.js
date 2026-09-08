const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
