const {
  createUser,
  getUsersTenant,
  deleteUser
} = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get(getUsersTenant);

router.route("/:toDeleteUserId").post(deleteUser);

router.route("/create").post(createUser);

module.exports = router;
