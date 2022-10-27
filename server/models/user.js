const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false, default: "user" },
  phone: { type: String, required: false },
  refreshToken: { type: String, required: false },
});

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().label("Role"),
    phone: Joi.string().label("Phone Number"),
    refreshToken: Joi.string().label("Refresh Token"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
