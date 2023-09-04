const User = require("../../models/User");
const ResponseHandler = require("../../utils/ResponseHandler");
const generateUserResponse = require("../../utils/UserData");

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  // try {
  if (!phone || !password) {
    return ResponseHandler.error(res, "Username and password are required.");
  }
  // Find the user by username (assuming username is unique)
  User.findOne({ "contact.phone": phone })
    .select("+password")
    .then(async (user) => {
      // match the password
      if (!(await user.matchPassword(password))) {
        return ResponseHandler.errorResponse(res, 401, "Incorrect password.");
      }
      const token = user.generateToken();

      user.password = undefined;
      user.isBanned = undefined;
      user.isActivated = undefined;
      // destrcuring = user

      // console.log(data);
      return ResponseHandler.successResponse(
        res,
        "Login successful.",
        generateUserResponse(user, token)
      );
    })

    .catch((err) => {
      return ResponseHandler.errorResponse(res, 401, "User not found.");
    });
};
exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return ResponseHandler.errorResponse(
        res,
        401,
        "All fields are required."
      );
    }

    await User.findOne({ "contact.phone": phone }).then((user) => {
      if (user) {
        return ResponseHandler.errorResponse(res, 401, "User already exists.");
      }
      const newUser = new User({
        inf: {
          name,
        },
        contact: {
          phone,
        },
        password,
      });

      const token = newUser.generateToken();

      newUser.save();

      return ResponseHandler.successResponse(
        res,
        "Registration successful.",
        generateUserResponse(newUser, token)
      );
    });
  } catch (err) {
    console.log(err);
  }
};
