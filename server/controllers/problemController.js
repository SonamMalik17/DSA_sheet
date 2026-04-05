const Problem = require("../models/Problem");
const User = require("../models/User");

exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ chapter: 1, topic: 1 });

    const grouped = {};
    for (const problem of problems) {
      if (!grouped[problem.chapter]) {
        grouped[problem.chapter] = {};
      }
      if (!grouped[problem.chapter][problem.topic]) {
        grouped[problem.chapter][problem.topic] = [];
      }
      grouped[problem.chapter][problem.topic].push(problem);
    }

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = Object.fromEntries(user.progress || new Map());
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { problemId, completed } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.progress.set(problemId, completed);
    await user.save();

    res.json({ problemId, completed });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
