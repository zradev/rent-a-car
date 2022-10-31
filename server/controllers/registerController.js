const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
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

module.exports = { handleNewUser };
