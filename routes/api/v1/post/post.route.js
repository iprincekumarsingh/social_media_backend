const router = require("express").Router();
const upload = require("../../../../middlewares/multer");
const auth = require("../../../../middlewares/auth.middleware");

const {
  createPost,
  createPoll,
} = require("../../../../controllers/post/Post.Controller");

// create post route
router.route("/create").post(auth, upload.single("image"), createPost);
router.route("/poll").post(auth, upload.single("image"), createPoll);

module.exports = router;
