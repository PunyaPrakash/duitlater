const User = require("../Models/User");
const bcrypt = require("bcrypt");

const signUpHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in signUpHandler", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUpHandler;
