const router = require("express").Router();
const api_routes = require('./api`')

router.use('/api', api_routes)

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected123!' });
});


module.exports = router;