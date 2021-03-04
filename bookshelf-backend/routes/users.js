const express = require("express");
const User = require("../models/userRegisterModel");
const popBook = require("../models/popularBookModel");

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
    res.json({ message: "mobile number already exists", status: "failure" });
  }
  try {
    const saveUser = await userSignup.save();
    res.json({
      data: saveUser,
      message: "signup successful",
      status: "success",
    });
  } catch {
    res.json({ message: "signup failed", status: "failure" });
  }
});

// Login post api
router.post("/login", async (req, res) => {
  const loginData = await req.body;
  const checkEmailArr = await User.find({ emailaddress: loginData.email });
  if (checkEmailArr.length) {
    if (checkEmailArr[0].password === loginData.password) {
      res.json({
        isLogin: true,
        message: "login successful",
        status: "success",
      });
    } else {
      res.json({
        data: { isLogin: false },
        message: "Password invalid",
        status: "failure",
      });
    }
  } else {
    res.json({
      data: { isLogin: false },
      message: "user not registered",
      status: "failure",
    });
  }
});

// All users get api
router.get("/allDetails", async (req, res) => {
  const userDetails = await User.find();
  res.json(userDetails);
});

// All popular books get api
router.get("/allBooks", async (req, res) => {
  const bookDetails = await popBook.find();
  try {
    res.json({
      data: bookDetails,
      message: "Popular books retrieved successful",
      status: "success",
    });
  } catch {
    res.json({
      status: "failure",
    });
  }
});

module.exports = router;
