const { User } = require("../../db/models");
const AppError = require("../../utils/appError");
const { validateEmail } = require("../auth/auth.helpers");
const bcrypt = require("bcryptjs");

const removeUser = async (tenantId, userId, toDeleteUserId) => {
  if (!tenantId || !userId) {
    throw new AppError("Missing tenant or user credentials", 400);
  }

  const user = await User.findOne({
    where: { id: toDeleteUserId, tenantId }
  });

  if (!user) {
    throw new AppError(`User not found for tenant ID: ${tenantId}`, 404);
  }

  await user.destroy();
  return true;
};

const addUser = async (
  { name, email, password },
  tenantFromCtx = null,
  req = null
) => {

  const tenant = tenantFromCtx || (req && req.tenant);

  if (!tenant) {
    throw new AppError("Tenant context is missing.", 400);
  }

  const tenantId = tenant.id;
  const tenantName = tenant.name;

  if (!name || !email || !password || !tenantId) {
    throw new AppError(
      "Any of the required parameters to create a User is missing",
      400
    );
  }

  if (!validateEmail(email)) {
    throw new AppError("Invalid email format.", 400);
  }

  const userExists = await User.findOne({ where : { email, tenantId } });

  if (userExists) {
    throw new AppError(
      `There is a User with the same email: ${email} for ${tenantName}`,
      409
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    tenantId,
  });

  return newUser;
};

const fetchUsersByTenantId = async (id) =>{


  if (!id) {
    throw new AppError("For this Action you need the Client ID");
  }

  const users = await User.findAll({ where : { tenantId: id } });

  return users;

}

module.exports = {
  addUser,
  fetchUsersByTenantId,
  removeUser
};
