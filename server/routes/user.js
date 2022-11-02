const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleRegister,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUser,
} = require("../controllers/userController");

router.post("/login", handleLogin);

router.post("/register", handleRegister);

router.get("/get/:id", handleGetUser);

router.put("/update/:id", handleUpdateUser);

router.delete("/delete/:id", handleDeleteUser);

module.exports = router;
