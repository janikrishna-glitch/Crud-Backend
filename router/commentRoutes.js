const express = require("express");
const router = express.Router();



// Import the comment creation controller
const { commentCreate } = require("../controller/commentcontroller");

// Apply middleware to protect the comment creation route
router.post("/create", commentCreate);

module.exports = router;
