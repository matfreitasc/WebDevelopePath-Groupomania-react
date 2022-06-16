const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/verifyJWT');

router.post('/signup', multer, userController.register);
router.post('/login', userController.login);
router.get('/refresh', userController.refreshToken);
router.get('/logout', userController.logout);
router.get('/user/:id', auth, userController.getUser);
router.put('/user/:id', auth, multer, userController.updateUser);
router.delete('/user/:id', auth, userController.deleteUser);

module.exports = router;
