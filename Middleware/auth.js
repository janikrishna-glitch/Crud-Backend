const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(); // No token means no user is logged in

  jwt.verify(token, "private-key", (err, user) => {
    if (err) return next(err);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
