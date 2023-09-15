import mongoose, { Schema } from "mongoose";
import User from "../models/user.models";

const pollOptionSchema = new Schema({
  optionText: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      index: true,
    },
    images: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    post_type: {
      type: String,
      enum: ["poll", "post"],
      default: "post",
    },
    poll_question: {
      type: String,
      required: function () {
        return this.post_type === "poll";
      },
    },
    poll_options: {
      type: Map,
      of: pollOptionSchema,
      required: function () {
        return this.post_type === "poll";
      },
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
