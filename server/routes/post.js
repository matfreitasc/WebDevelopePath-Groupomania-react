const express = require('express');
const router = express.Router();

const posts = require('../controllers/post');
const viewes = require('../controllers/viewes');
const auth = require('../middlewares/verifyJWT');
const multer = require('../middlewares/multer-config');

router.get('/', auth, posts.allPosts);
router.get('/:id', auth, posts.getOne);
router.get('/user/:id', auth, posts.getUserPosts);
router.post('/', auth, multer, posts.create);
router.delete('/:id', auth, posts.deletePost);
router.put('/:id', auth, multer, posts.updatePost);
router.post('/:id/viewes', auth, viewes.viewes);
router.get('/:id/getViewes', auth, viewes.getViewes);

module.exports = router;
