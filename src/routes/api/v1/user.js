const router = require("express").Router();

router.get('/', (req, res) => {
    res.json({ message: "this is user.", abc: process.env.DATABASE_URL });
})

module.exports = router;
