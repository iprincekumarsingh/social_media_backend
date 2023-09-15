const router = require("express").Router();

const { createPost } = require("../../../../controllers/post/Post.Controller");

// create post route
router.route("/create").post(createPost);

module.exports = router;
