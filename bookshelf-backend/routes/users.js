const express = require("express");
const User = require("../models/userRegisterModel");

// Router initialization
const router = express.Router();

// Signup post api
router.post("/signup", async (req, res) => {
  const userSignup = new User({
    username: req.body.name,
    mobilenumber: req.body.mobile,
    emailaddress: req.body.email,
    password: req.body.password,
  });
  const checkNo = userSignup.mobilenumber;
  const checkData = await User.find({ mobilenumber: checkNo });
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

// Login post api
router.post("/login", async (req, res) => {
  const loginData = await req.body;
  const checkEmailArr = await User.find({ emailaddress: loginData.email });
  if (checkEmailArr.length) {
    if (checkEmailArr[0].password === loginData.password) {
      res.json({ isLogin: true, status: "success" });
    } else {
      res.json({ isLogin: false, status: "user not registered" });
    }
  }
});

// All users get api
router.get("/allDetails", async (req, res) => {
  const userDetails = await User.find();
  res.json(userDetails);
});

module.exports = router;
