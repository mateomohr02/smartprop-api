const { addUser } = require("../services/user/user.service");

const getUsersTenant = async (req, res) => {
  
}

const createUser = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body, null, req); 

    res.status(201).json({
      status: "success",
      message: "User created",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser
};

