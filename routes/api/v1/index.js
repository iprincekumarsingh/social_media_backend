const router = require("express").Router();

const authRoute = require("./Auth.route");
const postRoute = require("./post/post.route");

router.use("/auth", authRoute);
router.use("/post", postRoute);


router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

module.exports = router;
