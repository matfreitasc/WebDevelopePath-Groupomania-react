const { Posts } = require('../models/');

exports.allPosts = async (req, res) => {
  const allPosts = await Posts.findAll();
  res.send(allPosts);
};

exports.getOne = async (req, res) => {
  const post = await Posts.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.send(post);
};

exports.create = async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Posts.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) {
    return res.status(404).json({
      Success: false,
      Message: 'Post not found',
    });
  }
  await post.destroy();
  res.json({
    Success: true,
    Message: 'Post deleted successfully',
  });
};
