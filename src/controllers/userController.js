const userService = require("../services/userService");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.register(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getAllUsers };
