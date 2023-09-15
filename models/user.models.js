const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
