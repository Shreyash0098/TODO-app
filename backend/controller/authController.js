const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { password, email, userName } = req.body;
    if (!password || !email || !userName) {
      return res.status(404).json({ message: "please enter required fields" });
    }
    const hashedpsw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedpsw,
      userName: userName,
    });
    const result = await user.save();
    res.status(200).json({ message: "user Signed up", result: result });
  } catch (error) {
    res.status(500).json({ message: "Try again after some time" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let logedinUser;
    if (!password || !email) {
      return res.status(404).json({ message: "please enter required fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this email not found" });
    }
    logedinUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(401).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
      { email: logedinUser.email, userId: logedinUser._id.toString() },
      "ifyouknowyouknow",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: logedinUser._id.toString() });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
