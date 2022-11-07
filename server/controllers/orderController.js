const { Order } = require("../models/order");

const handleNewOrder = async (req, res) => {
  const { userId, carId, pick, drop } = req.body;
  const duplicate = await Order.findOne({
    userId,
    carId,
    pick,
    drop,
  });
  if (duplicate)
    return res.status(409).send({
      message: `You have already rented the car from ${pick} to ${drop}`,
    });
  try {
    await Order.create({ ...req.body });
    res
      .status(201)
      .send({ message: "The car rental has been successfully added." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleDeleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send({ message: "The car rental has been successfully deleted." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.json(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetAllUserOrders = async (req, res) => {
  try {
    Order.find((err, val) => {
      if (err) {
        console.log(err);
      } else {
        if (val.userId === req.userId) res.json(val);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    Order.find((err, val) => {
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
  handleNewOrder,
  handleDeleteOrder,
  handleGetOrder,
  handleGetAllUserOrders,
  handleGetAllOrders,
};
