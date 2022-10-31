const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
        phone: foundUser.phone,
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

module.exports = { handleLogin };
