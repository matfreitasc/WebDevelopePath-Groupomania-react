const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/verifyJWT');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/refresh', userController.refreshToken);
router.get('/logout', userController.logout);
router.get('/user/:id', auth, userController.getUser);
router.put('/user/:id', auth, userController.updateUser);

module.exports = router;
