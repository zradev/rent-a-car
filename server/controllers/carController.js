const { Car } = require("../models/car");

const handleNewCar = async (req, res) => {
  const duplicate = await Car.findOne({
    brand: req.body.brand,
    model: req.body.model,
  });
  if (duplicate)
    return res.status(409).send({
      message: "This car is already added, you should increase its quantity.",
    });
  try {
    await Car.create({ ...req.body });
    res.status(201).send({ message: "Car added successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleDeleteCar = async (req, res) => {
  try {
    await Car.deleteOne({ id: req.body._id });
    res.status(204).send({ message: "Car deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleUpdateCar = async (req, res) => {
  try {
    car = await Car.findOne({ _id: req.body._id });
    if (!car) return res.status(404).send({ message: "Car not found." });
    await car.updateOne(req.body);
    await car.save();
    res.status(200).send({ message: "Car updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { handleNewCar, handleDeleteCar, handleUpdateCar };
