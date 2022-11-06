const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/create", carController.handleNewCar);

router.delete("/delete/:id", carController.handleDeleteCar);

router.put("/update/:id", carController.handleUpdateCar);

router.get("/get/:id", carController.handleGetCar);

router.get("/get-all", carController.handleGetAll);

module.exports = router;
