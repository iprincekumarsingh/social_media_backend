const User = require("../../models/user.models");
const { ApiResponse } = require("../../utils/ApiResonse");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      // Check email existence
      if (existingUser.email === email) {
        return ApiResponse(res, null, "Email already exists", 400, false);
      }
      // Check username existence
      if (existingUser.username === username) {
        return ApiResponse(res, null, "Username already exists", 400, false);
      }
    }

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    // Save the user
    const savedUser = await newUser.save();

    // Generate a token
    const token = await savedUser.generateToken();

    return ApiResponse(
      res,
      { user: savedUser, token },
      "User created successfully",
      201,
      true
    );
  } catch (error) {
    return ApiResponse(res, null, error.message, 500, false);
  }
};
