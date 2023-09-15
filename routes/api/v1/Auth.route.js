const router = require('express').Router();


// Import our controllers

const { register } = require('../../../controllers/auth/Auth.Controller')


router.route('/register').post(register);

module.exports = router;