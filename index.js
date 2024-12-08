

const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const authenticateToken = require("./Middleware/auth");
const commentRouter = require("./router/commentRoutes");

const app = express();
const userRouter = require("./router/userrouter");
const articleRouter = require("./router/articalrouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authenticateToken);

app.use("/user", userRouter);
app.use("/artical", articleRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.render("navbar", { user: req.user });
});

mongoose.connect("mongodb+srv://janikrishna918:123456789krishna@cluster0.5ekmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0*")

const db = mongoose.connection;
db.on("connected", () => {
  console.log("databess connected");
});

app.listen(7881, () => {
  console.log("server is working");
});
