const router = require("express").Router();

const auth = require("../../../../middlewares/auth.middleware");

// vote on a poll
const { vote } = require("../../../../controllers/poll/Poll.Controller");

router.route("/:id").post(auth, vote);


// test route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

module.exports = router;
