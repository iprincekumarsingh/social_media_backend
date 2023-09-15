const { ApiResponse } = require("../../utils/ApiResonse");
const Post = require("../../models/post.model");
exports.createPost = async (req, res) => {
  try {
    // getting content from the request body
    const { id } = req.user;
    const { content } = req.body;

    const newPost = await Post.create({
      content,
      // image url

      author: id,
      post_type: "post",
    });
    return ApiResponse(res, newPost, "Post created successfully", 201, true);
  } catch (error) {
    return ApiResponse(res, null, error.message, 500, false);
  }
};
exports.createPoll = async (req, res) => {};