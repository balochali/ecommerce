const { registerUser, loginUser } = require("../services/authService.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
}