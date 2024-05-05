const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// create a user via registration
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save the user
    const newUser = new User(req.body);
    await newUser.save();
    return res.send({ success: true, message: "User Created" });
  } catch (error) {
    console.log(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        success: false,
        message: "User Doesn't Exist",
      });
    }

    // compare the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Password Doesn't Match",
      });
    }

    // create a jwt token
    const jwtToken = jwt.sign(
      { userId: userExists._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.send({
      success: true,
      message: "Login Successfull",
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
  }
});

// get user details by id
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const userExists = await User.findById(req.body.userId).select("-password");
    return res.send({
      success: true,
      message: "User details fetched",
      data: userExists,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Details not feched",
    });
  }
});

module.exports = router;
