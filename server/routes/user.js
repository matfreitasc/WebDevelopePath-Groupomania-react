const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const refreshController = require('../controllers/refreshToken');
const handleLogout = require('../controllers/logout');

const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/refresh', refreshController.refreshToken);
router.get('/logout', handleLogout.logout);
router.get('/', auth, userController.validate);

module.exports = router;
