
const { addUser, fetchUsersByTenantId  } = require("../services/user/user.service");
const AppError = require("../utils/appError");

const getUsersTenant = async (req, res) => {
  try {

    const users = await fetchUsersByTenantId(req.tenant.id);

    res.status(201).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    throw new AppError(error, 401);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body, null, req);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    throw new AppErrorError(error, 401);
  }
};

module.exports = {
  createUser,
  getUsersTenant
};
