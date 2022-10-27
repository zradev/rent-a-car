const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/create", carController.handleNewCar);
router.post("/delete", carController.handleDeleteCar);
router.post("/update", carController.handleUpdateCar);

module.exports = router;
