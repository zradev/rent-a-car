const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  fuel: { type: String, required: true },
  seats: { type: Number, required: true },
  images: { type: [String], required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  count: { type: Number, default: 1 },
});

Car = mongoose.model("car", carSchema);

module.exports = { Car };
