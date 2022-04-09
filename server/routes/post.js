const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const auth = require('../middlewares/auth');

router.get('/', posts.allPosts);
router.get('/:id', posts.getOne);
router.post('/', auth, posts.create);
router.delete('/:id', auth, posts.deletePost);

module.exports = router;
