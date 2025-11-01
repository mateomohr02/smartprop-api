
const { addUser, fetchUsersByTenantId, removeUser } = require("../services/user/user.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getUsersTenant = catchAsync(async (req, res) => {
  const users = await fetchUsersByTenantId(req.tenant.id);
  res.status(200).json({ status: "success", data: users });
});

const createUser = catchAsync(async (req, res) => {
  const newUser = await addUser(req.body, null, req);
  res.status(201).json({ status: "success", data: newUser });
});

const deleteUser = catchAsync(async (req, res) => {
  const { toDeleteUserId } = req.params;
  await removeUser(req.tenant.id, req.user.id, toDeleteUserId);
  res.status(200).json({ status: "success" });
});



module.exports = {
  createUser,
  getUsersTenant,
  deleteUser
};
