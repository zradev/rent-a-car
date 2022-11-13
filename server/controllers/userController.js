const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error) {
    if (error.message === `"Email" must be a valid email`)
      return res
        .status(400)
        .send({ message: "This Email Address doesn't exist." });
    return res.status(400).send({ message: error.details[0].message });
  }
  if (!email || !password)
    return res
      .status(400)
      .send({ message: "Email and Password are required." });

  const duplicate = await User.findOne({ email: email });
  if (duplicate)
    return res
      .status(409)
      .send({ message: "User with given email already Exist!" });

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashedPwd = await bcrypt.hash(password, salt);

    const result = await User.create({
      ...req.body,
      email,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return res.status(401).send({ message: "Invalid Email or Password" });

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (validPassword) {
    const token = jwt.sign(
      {
        id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
        phone: foundUser.phone,
        birthday: foundUser.birthday,
        licenseNum: foundUser.licenseNum,
        licenseCountry: foundUser.licenseCountry,
        licenseIssueDate: foundUser.licenseIssueDate,
        licenseExpireDate: foundUser.licenseExpireDate,
      },
      process.env.ACCESS_TOKEN_SECRET || "TOKEN_SECRET",
      { expiresIn: "1d" }
    );

    const result = await foundUser.save();
    console.log(result);

    return res.send({
      token,
    });
  } else {
    return res.status(401).send({ message: "Invalid Email or Password" });
  }
};

const handleGetUser = async (req, res) => {
  try {
    foundUser = await User.findOne({ _id: req.params.id });
    if (!foundUser) return res.status(404).send({ message: "User not found." });
    res.status(200).send({
      id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      role: foundUser.role,
      phone: foundUser.phone,
      birthday: foundUser.birthday,
      licenseNum: foundUser.licenseNum,
      licenseCountry: foundUser.licenseCountry,
      licenseIssueDate: foundUser.licenseIssueDate,
      licenseExpireDate: foundUser.licenseExpireDate,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    foundUser = await User.findOne({ _id: req.params.id });
    if (!foundUser) return res.status(404).send({ message: "User not found." });
    await foundUser.updateOne(req.body, { runValidators: true });
    await foundUser.save();
    res.status(200).send({ message: "User updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleUpdateUser,
  handleGetUser,
  handleDeleteUser,
};
