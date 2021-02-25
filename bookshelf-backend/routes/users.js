const express = require("express");
const User = require("../models/userRegisterModel");

// Router initialization
const router = express.Router();

// Signup post api
router.post("/signup", async (req, res) => {
  const userSignup = new User({
    username: req.body.username,
    mobilenumber: req.body.mobilenumber,
    emailaddress: req.body.emailaddress,
  });
  const checkNo = userSignup.mobilenumber;
  const checkData = await User.find({ mobilenumber: checkNo });
  console.log(checkData);
  if (checkData.length) {
    res.json({ status: "mobile number already exists" });
  }
  try {
    const saveUser = await userSignup.save();
    res.json(saveUser);
  } catch {
    res.json({ status: "failure" });
  }
});

module.exports = router;
