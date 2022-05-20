const express = require('express');
const router = express.Router();

const postLike = require('../controllers/likes');
const auth = require('../middlewares/verifyJWT');

router.post('/', auth, postLike.like);
router.post('/dislike', auth, postLike.dislike);
router.post('/getLikes', auth, postLike.getLikes);
router.post('/getDislikes', auth, postLike.getDislikes);

module.exports = router;
