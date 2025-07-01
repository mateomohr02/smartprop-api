const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");
const AppError = require("../../utils/appError");
const {
  generateToken,
  validateEmail
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

const loginUser = async ({ email, password }, tenantId) => {
  
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ where: { email , tenantId} });

  if (!user) {
    throw new AppError("Incorrect Credentials", 401);
  }

  const passwordMatch = bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Incorrect Password", 401);
  }

  const token = generateToken({ id: user.id });

  return { token };
};


module.exports = {
  registerUser,
  loginUser
};
