const { Order } = require("../models/order");

const isOrderActive = (date) => {
  const [day, month, year] = date.split("-");
  const dropDate = new Date(year, month - 1, day);
  const today = new Date();
  const isActive = dropDate >= today;
  return isActive;
};

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

    if (!order) return res.status(404).send({ message: "Car not found." });
    if (!isOrderActive(order.drop)) {
      await order.updateOne({ isActive: false }, { runValidators: true });
      await order.save();
      res.json({ ...order, isActive: false });
    } else {
      res.json(order);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetAllUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    const result = orders.map((order) => {
      if (!isOrderActive(order.drop)) {
        order
          .updateOne({ isActive: false })
          .then(() => order.save(), { runValidators: true });
        return { ...order._doc, isActive: false };
      } else {
        return order;
      }
    });
    res.json(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const result = orders.map((order) => {
      if (!isOrderActive(order.drop)) {
        order.updateOne({ isActive: false }).then(() => order.save());
        return { ...order._doc, isActive: false };
      } else {
        return order;
      }
    });
    res.json(result);
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
