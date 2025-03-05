const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getAllUsers);

module.exports = router;
