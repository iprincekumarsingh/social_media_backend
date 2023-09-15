const router = require('express').Router();


// Import our controllers

const { register,login } = require('../../../controllers/auth/Auth.Controller')


router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;