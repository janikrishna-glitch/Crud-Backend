
const commentModel = require("../models/comment.js");
const ArticleModel = require("../models/artical.js");

const commentCreate = async (req, res) => {
  try {
    const { articleId, commentText } = req.body;
    const userId = req.user ? req.user._id : null; // Capture the user ID if available

    if (!articleId || !commentText) {
      return res.status(400).send("Article ID and comment text are required.");
    }

    // Create a new comment
    const newComment = await commentModel.create({
      commentText,
      userId,
      articleId,
    });

    // Update the article with the new comment
    await ArticleModel.findByIdAndUpdate(articleId, {
      $push: { comments: newComment._id },
    });

    return res.redirect(`/artical/${articleId}/comments`); // Redirect to the comments page or wherever appropriate
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { commentCreate };
