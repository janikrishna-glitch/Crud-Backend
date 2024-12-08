
const express = require("express");
const router = express.Router();
const {
  register,
  signup,
  login,
  signin,
  logout,
} = require("../controller/usercontroller");

router.get("/register", register);
router.post("/signup", signup);
router.get("/login", login);
router.post("/signin", signin);
router.get("/logout", logout);

module.exports = router;
