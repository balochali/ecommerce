const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db.js")

const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
 const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

// User Login
 const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return { token, user };
};

module.exports ={
registerUser,
loginUser  
}
