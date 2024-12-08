const ArticleModel = require("../models/artical");
const commentModel = require("../models/comment");

const get = (req, res) => {
  res.render("createar"); // Ensure this template exists
};

const createArticle = async (req, res) => {
  try {
    const { authorName, description, commentText } = req.body;

    const newArticle = new ArticleModel({
      authorName: authorName,
      description: description,
    });

    await newArticle.save();

    if (commentText) {
      const newComment = new commentModel({
        articleId: newArticle._id,
        commentText: commentText,
        userId: req.user ? req.user._id : null,
      });

      await newComment.save();
    }

    return res.redirect("/artical/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Other methods: list, showComments, edit, update, remove

const list = async (req, res) => {
  try {
    const user = req.user || {};
    let query = {};

    if (user.role === "admin") {
      query = { userId: user._id }; // Adjust this query as needed
    }

    const articles = await ArticleModel.find(query).populate(
      "userId",
      "username"
    );

    return res.render("articles", { articles, user });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const showComments = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await ArticleModel.findById(id).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username",
      },
    });

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.render("comments", {
      article,
      comments: article.comments,
      user: req.user || {},
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const edit = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    return res.render("editar", { article });
  } catch (error) {
    console.error("Error fetching article for editing:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    const { auther, desc } = req.body; // Ensure these names match the form inputs
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    // Update the article fields
    article.authorName = auther; // Corrected from "Authername" to "authorName"
    article.description = desc; // Corrected from "Desc" to "description"

    await article.save(); // Save the updated article to the database

    return res.redirect("/artical/list");
  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    await article.deleteOne();

    return res.redirect("/artical/list");
  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  get,
  createArticle,
  list,
  update,
  remove,
  edit,
  showComments,
};
