const { addUser } = require("../services/tenant/user.service");

const createUser = async (req, res, next) => {
  console.log(req.body, "BODY");

};

module.exports = {
  createUser,
};

