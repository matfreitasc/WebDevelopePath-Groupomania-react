const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const auth = require('../middlewares/auth');

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
  if (res.addTrailers.error) {
    return res.status(401).json({
      Success: false,
      Message: 'User not logged in',
    });
  }
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
