const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const auth = require('../middlewares/verifyJWT');

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.send(comments);
});

router.post('/', auth, async (req, res) => {
  const comment = req.body;
  const username = req.username;
  const userId = req.userId;
  comment.username = username;
  comment.userId = userId;
  await Comments.create(comment);
  res.json(comment);
});

router.delete('/:commentId', auth, async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comments.findOne({
    where: {
      id: commentId,
    },
  });
  if (!comment) {
    return res.status(404).json({
      Success: false,
      Message: 'Comment not found',
    });
  }
  await comment.destroy();
  res.json({
    Success: true,
    Message: 'Comment deleted successfully',
  });
});

module.exports = router;
