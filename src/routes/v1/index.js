const router = require("express").Router();

const userRoutes = require('./user');
router.use('/user',userRoutes)

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = router;