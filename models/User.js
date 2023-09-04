const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  contact: {
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 13,
    },
    email: {
      type: String,
      unique: true,
      required: false,
      maxlength: 50,
    },
  },
  inf: {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    about: {
      type: String,
      maxlength: 1000,
    },
    bio: {
      type: String,
      maxlength: 1000,
    },
    heading: {
      type: String,
      maxlength: 1000,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  otp: {
    type: String,
    required: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
