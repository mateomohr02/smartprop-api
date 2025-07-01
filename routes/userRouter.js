const {
  createUser
} = require("../controllers/userController");

const router = require("express").Router();

router.route("/create").post(createUser);

module.exports = router;
