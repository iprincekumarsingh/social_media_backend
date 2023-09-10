const router = require("express").Router();
const v1_routes = require('./v1')

router.use('/v1', v1_routes)

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected123!' });
});


module.exports = router;