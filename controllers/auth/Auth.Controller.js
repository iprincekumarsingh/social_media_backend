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

exports.login = async (req, res) => {
  const { input, password } = req.body;

  try {
    // Regular expressions for email and phone number patterns
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePatternWithoutCountryCode = /^\d{10}$/;

    let user;

    if (emailPattern.test(input)) {
      // It's an email
      user = await User.findOne({ email: input });
    } else if (phonePatternWithoutCountryCode.test(input)) {
      // It's a phone number with country code
      user = await User.findOne({ phone: input });
    } else {
      // It's neither an email nor a phone number
      return res
        .status(400)
        .json({ message: "Input is not a valid email or phone number." });
    }

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    if (!(await user.matchPassword(password)))
      return ApiResponse(res, null, "Invalid credentials", 400, false);

    const token = await user.generateToken();

    return ApiResponse(res, { user, token }, false, 200, true);
  } catch (error) {
    return ApiResponse(res, null, error.message, 500, false);
  }
};
