const router = require("express").Router();

const {
  GetProfile,
  UpdateProfile,
} = require("../../controllers/user/User.Controller");

// profile route
router.route("/profile").get(GetProfile);
router.route("/profile").put(UpdateProfile);

module.exports = router;
