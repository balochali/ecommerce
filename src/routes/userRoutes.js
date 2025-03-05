const express = require("express");
const { getAllUsers } = require("../services/authService");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
