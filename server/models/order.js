const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  carId: { type: String, required: true },
  pick: { type: String, required: true },
  drop: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

Order = mongoose.model("order", orderSchema);

module.exports = { Order };
