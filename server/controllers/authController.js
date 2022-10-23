const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req: ", req.body);
  console.log("email: " + email, "password: " + password);
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return res.status(401).send({ message: "Invalid Email or Password" });

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (validPassword) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    return res.status(401).send({ message: "Invalid Email or Password" });
  }
};

module.exports = { handleLogin };
