const express = require("express");
const {
  getAllProblems,
  getProgress,
  updateProgress,
} = require("../controllers/problemController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllProblems);
router.get("/progress", auth, getProgress);
router.put("/progress", auth, updateProgress);

module.exports = router;
