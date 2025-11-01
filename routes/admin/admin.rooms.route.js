const {
    fetchOtherRoomsController
} = require("../../controllers/admin/admin.rooms.controller");

const router = require("express").Router();

router.route("").get(fetchOtherRoomsController);

module.exports = router;