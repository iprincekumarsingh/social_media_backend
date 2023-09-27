const router = require("express").Router();

const auth = require("../../../../middlewares/auth.middleware");
const upload = require("../../../../middlewares/multer");

// vote on a poll
const { vote,createPoll } = require("../../../../controllers/poll/Poll.Controller");

router.route("/poll").post(auth, upload.single("image"), createPoll);
router.route("/:id").post(auth, vote);


// test route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

module.exports = router;
