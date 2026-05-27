const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    actorEmail: String,
    action: { type: String, required: true },
    resource: String,
    resourceId: String,
    meta: mongoose.Schema.Types.Mixed,
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
