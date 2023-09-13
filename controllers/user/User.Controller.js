const ResponseHandler = require("../../utils/ResponseHandler");
const User = require("../../models/user.models");
const generateUserResponse = require("../../utils/UserData");
exports.GetProfile = async (req, res) => {
  try {
    const { id } = req.user;

    User.findById(id)
      .then((user) => {
        if (!user) {
          return ResponseHandler.errorResponse(res, 401, "User not found.");
        }
        return ResponseHandler.successResponse(
          res,
          "User found.",
          generateUserResponse(user)
        );
      })
      .catch((err) => {
        return ResponseHandler.errorResponse(res, 401, "Something went wrong.");
      });
  } catch (err) {
    return ResponseHandler.errorResponse(res, 500, "Internal server error.");
  }
};
exports.UpdateProfile = async (req, res) => {};
