const express = require('express');
const router = express.Router();

const postLike = require('../controllers/likes');
const auth = require('../middlewares/auth');

router.post('/', auth, postLike.like);

module.exports = router;
