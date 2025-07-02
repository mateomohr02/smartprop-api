const {
  createUser,
  getUsersTenant
} = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get(getUsersTenant);

router.route("/create").post(createUser);

module.exports = router;
