const router = require("express").Router();

const authRoute = require("./Auth.route");
const userRoute = require("./User.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);


router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;
