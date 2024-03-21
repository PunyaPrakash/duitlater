const User = require("../Models/User");
const bcrypt = require("bcrypt");

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: "Invalid username or password" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Sign-in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = handleSignIn;
