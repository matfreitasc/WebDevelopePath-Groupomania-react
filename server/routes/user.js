const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const refreshController = require('../controllers/refreshToken');
const handleLogout = require('../controllers/logout');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', refreshController.refreshToken);
router.get('/logout', handleLogout.logout);

module.exports = router;
