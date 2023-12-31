const router = require("express").Router();
const upload = require("../../../../middlewares/multer");
const auth = require("../../../../middlewares/auth.middleware");

const {
  createPost,
  createPoll,
  deletePost,
} = require("../../../../controllers/post/Post.Controller");

// create post route
router.route("/create").post(auth, upload.single("image"), createPost);

router.route("/:id").delete(auth, deletePost);
module.exports = router;
