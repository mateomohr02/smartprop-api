const { User, Tenant } = require("../db/models");
const AppError = require("../utils/appError");
const { verifyToken } = require("../services/auth/auth.helpers");

const validateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !req.tenant) {
      throw new AppError("Authentication or tenant information missing.", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Token not provided", 401);
    }

    const decoded = verifyToken(token);

    const tenant = await Tenant.findByPk(req.tenant.id);
    const user = await User.findByPk(decoded.id);

    if (!user || !tenant || !user.isValidated || user.tenantId !== tenant.id) {
      throw new AppError("User validation failed.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateUser;
