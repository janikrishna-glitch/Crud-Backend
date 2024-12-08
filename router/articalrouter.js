
const express = require("express");
const router = express.Router();
const {
  get,
  createArticle,
  list,
  update,
  remove,
  edit,
  showComments,
} = require("../controller/artcalcontroller");
const authenticateToken = require("../Middleware/auth");

// Existing routes
router.get("/create", get);
router.post("/create", authenticateToken, createArticle);
router.get("/list", list); // This now supports filtering by user ID
router.get("/:id/edit", edit);
router.post("/:id/update", update);
router.post("/:id/delete", remove);

// New route to show only comments
router.get("/:id/comments", showComments); // This now supports filtering comments by user ID

module.exports = router;
