const Umodel = require("../models/user");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  return res.render("register", { user: req.user || {} });
};

const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).send("All fields are required.");
    }

    const existingUser = await Umodel.findOne({ Username: username });
    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const newUser = await Umodel.create({
      Username: username,
      Password: password,
      Role: role,
    });
    console.log(newUser);

    return res.redirect("/user/login");
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const login = (req, res) => {
  return res.render("login", { user: req.user });
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Umodel.findOne({
      Username: username,
      Password: password,
    });

    if (!user) {
      return res.status(404).send({ message: "User not Found" });
    }

    if (user.Password !== password) {
      return res.send("Password does not match");
    }

    let payload = {
      username: user.Username,
      id: user._id,
      role: user.Role,
    };

    let token = jwt.sign(payload, "private-key");

    return res.cookie("token", token).redirect("/artical/list");
  } catch (error) {
    console.error("Error during sign in:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/user/register");
};

module.exports = { register, signup, login, signin, logout };
