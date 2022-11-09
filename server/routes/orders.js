const express = require("express");
const router = express.Router();
const {
  handleNewOrder,
  handleDeleteOrder,
  handleGetOrder,
  handleGetAllUserOrders,
  handleGetAllOrders,
} = require("../controllers/orderController");

router.post("/create", handleNewOrder);

router.delete("/delete/:id", handleDeleteOrder);

router.get("/get/:id", handleGetOrder);

router.get("/get-all-from/:id", handleGetAllUserOrders);

router.get("/get-all", handleGetAllOrders);

module.exports = router;
