const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    bluetick: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ["0", "1"],
      default: "1", // Default to user
    },
    profile_pic: {
      type: String,
      required: false,
      trim: true,
    },
    info: {
      about: {
        type: String,
        required: false,
        trim: true,
      },
      bio: {
        type: String,
        required: false,
        trim: true,
      },
      headline: {
        type: String,
        required: false,
        trim: true,
      },
    },
    social_link: {
      facebook: {
        type: String,
        required: false,
        trim: true,
      },
      twitter: {
        type: String,
        required: false,
        trim: true,
      },
      github: {
        type: String,
        required: false,
        trim: true,
      },
      linkedin: {
        type: String,
        required: false,
        trim: true,
      },
      instagram: {
        type: String,
        required: false,
        trim: true,
      },
      youtube: {
        type: String,
        required: false,
        trim: true,
      },
      website: {
        type: String,
        required: false,
        trim: true,
      },
    },
    location: {
      country: {
        type: String,
        required: false,
        trim: true,
      },
      state: {
        type: String,
        required: false,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// check if the user passwod is correct
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
