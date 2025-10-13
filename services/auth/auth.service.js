const bcrypt = require("bcryptjs");
const { User, Tenant } = require("../../db/models");
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

const loginUser = async ({ email, password }) => {

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError("Incorrect Credentials", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Incorrect Password", 401);
  }

  if (!user.isValidated) {
    throw new AppError("User not validated", 401);
  }

  const tenant = await Tenant.findByPk(user.tenantId);

  if (!tenant) {
    throw new AppError("Tenant not found", 404);
  }

  if (!tenant.active) {
    throw new AppError("Tenant is inactive", 401);
  }

  const token = generateToken({ id: user.id });

  const tenantId = tenant.id;

  return { token, tenantId };
};


module.exports = {
  registerUser,
  loginUser
};
