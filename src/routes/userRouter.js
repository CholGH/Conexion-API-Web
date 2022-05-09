const express = require('express')
const userController = require('../controllers/userController');
const isAunthenticated = require('../midleware/isAunthenticated');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/current_user', isAunthenticated ,userController.current_user);

module.exports = router ;