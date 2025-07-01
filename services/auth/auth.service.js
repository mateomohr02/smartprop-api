const { User } = require("../../db/models");
const AppError = require("../../utils/appError");
const {
  generateToken,
  validateEmail,
  verifyToken,
} = require("./auth.helpers");

const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required.", 400);
  }

  if (!validateEmail(email)) {
    throw new AppError("Invalid email format.", 400);
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new AppError("Email is already in use.", 409);
  }

  const newUser = await User.create({ name, email, password });
  return newUser;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("Incorrect Email", 401);
  }

  const passwordMatch = password === user.password; // ⚠️ Usa bcrypt en producción
  if (!passwordMatch) {
    throw new AppError("Incorrect Password", 401);
  }

  const token = generateToken({ id: user.id });

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType,
  };

  return { token, userData };
};

const authenticateToken = async (token) => {
  if (!token) {
    throw new AppError("Please login to get access", 401);
  }

  const decoded = verifyToken(token);
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new AppError("User not validated. Please login again.", 401);
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
};
