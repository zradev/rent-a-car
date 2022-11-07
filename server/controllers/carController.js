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
    await Car.deleteOne({ id: req.params.id });
    res.status(204).send({ message: "Car deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleUpdateCar = async (req, res) => {
  try {
    car = await Car.findOne({ _id: req.params.id });
    if (!car) return res.status(404).send({ message: "Car not found." });
    await car.updateOne(req.body);
    await car.save();
    res.status(200).send({ message: "Car updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id });
    res.json(car);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetAll = async (req, res) => {
  try {
    Car.find((err, val) => {
      if (err) {
        console.log(err);
      } else {
        res.json(val);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  handleNewCar,
  handleDeleteCar,
  handleUpdateCar,
  handleGetCar,
  handleGetAll,
};
