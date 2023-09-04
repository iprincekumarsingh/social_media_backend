const router = require('express').Router();


// Import our controllers

const {  login, logout, register } = require('../../controllers/auth/Auth.Controller')


router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;