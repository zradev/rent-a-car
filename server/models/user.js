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
  phone: { type: String, required: false, default: "" },
  birthday: { type: String, required: false, default: "" },
  licenseNum: { type: String, required: false, default: "" },
  licenseCountry: { type: String, required: false, default: "" },
  licenseIssueDate: { type: String, required: false, default: "" },
  licenseExpireDate: { type: String, required: false, default: "" },
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
    birthday: Joi.string().label("Birthday"),
    licenseNum: Joi.string().label("License Number"),
    licenseCountry: Joi.string().label("License Country of Issue"),
    licenseIssueDate: Joi.string().label("License Date of Issue"),
    licenseExpireDate: Joi.string().label("License Expiration Date"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
