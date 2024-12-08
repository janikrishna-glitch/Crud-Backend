
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  authorName: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const ArticleModel = mongoose.model("Article", articleSchema);

module.exports = ArticleModel;
