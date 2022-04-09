const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', auth, userController.validate);

module.exports = router;
