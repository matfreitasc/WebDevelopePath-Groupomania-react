const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const auth = require('../middlewares/verifyJWT');
const multer = require('../middlewares/multer-config');

router.get('/', auth, posts.allPosts);
router.get('/:id', auth, posts.getOne);
router.post('/', auth, multer, posts.create);
router.delete('/:id', auth, posts.deletePost);
router.put('/:id', auth, posts.updatePost);

module.exports = router;
