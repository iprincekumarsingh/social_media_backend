const router = require("express").Router();

const authRoute = require("./Auth.route");
const postRoute = require("./post/post.route");
const pollRoute = require("./poll/Poll.route");

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/poll", pollRoute);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

module.exports = router;
