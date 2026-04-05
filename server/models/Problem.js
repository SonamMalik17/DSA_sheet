const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  chapter: {
    type: String,
    required: true,
    index: true,
  },
  topic: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  youtubeLink: {
    type: String,
    default: "",
  },
  leetcodeLink: {
    type: String,
    default: "",
  },
  articleLink: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Problem", problemSchema);
