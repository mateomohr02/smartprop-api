
const { addUser, fetchUsersByTenantId, removeUser } = require("../services/user/user.service");
const AppError = require("../utils/appError");

const getUsersTenant = async (req, res) => {
  try {

    const users = await fetchUsersByTenantId(req.tenant.id);

    res.status(201).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
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
    next(error); 
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { toDeleteUserId } = req.params;

    await removeUser(req.tenant.id, req.user.id, toDeleteUserId);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully"
    });

  } catch (error) {
    next(error); 
  }
};


module.exports = {
  createUser,
  getUsersTenant,
  deleteUser
};
