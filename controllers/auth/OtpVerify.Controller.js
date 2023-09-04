const User = require("../../models/User");
const ResponseHandler = require("../../utils/ResponseHandler");

exports.VerifyAccount = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    User.findOne({
      "contact.phone": phone,
      "contact.otp": otp,
    }).then((user) => {
      if (!user) {
        return ResponseHandler.notFound(res, "Account doesn't exist.");
      }
      if (user) {
        user.contact.otp = undefined;
        user.contact.isVerified = true;
        user.save();
        const token = user.generateToken();
        return ResponseHandler.success(res, "Account verified successfully.", {
          user,
          token,
        });
      }
    });
  } catch (error) {
    return ResponseHandler.internalServerError(res, "Something went wrong.");
  }
};
