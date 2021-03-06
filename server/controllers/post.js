const { Posts, Likes, Dislikes, Viewes, Comments } = require('../models/');

exports.allPosts = async (req, res) => {
  const allPosts = await Posts.findAll({
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Likes,
      },
      {
        model: Dislikes,
      },
      {
        model: Viewes,
      },
      {
        model: Comments,
      },
    ],
  });
  res.json(allPosts);
};

exports.getOne = async (req, res) => {
  const view = await Viewes.count({
    where: { PostId: req.params.id },
  });
  const post = await Posts.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Likes,
      },
      {
        model: Dislikes,
      },
    ],
  });
  res.json({ post, view });
};

exports.create = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const body = req.body;
  if (req.file === undefined) {
    const post = await Posts.create({
      ...body,
    });
    res.status(201).json({
      message: 'Post created!',
      post,
    });
  } else {
    const post = await Posts.create({
      ...body,
      imageUrl: url + '/images/' + req.file.filename,
    });
    res.status(201).json({
      message: 'Post created!',
      post,
    });
  }
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

exports.updatePost = async (req, res) => {
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
  const url = req.protocol + '://' + req.get('host');
  const body = req.body;
  if (req.file === undefined) {
    await post.update({
      ...body,
    });
    res.status(201).json({
      message: 'Post updated!',
      post,
    });
  } else {
    await post.update({
      ...body,
      imageUrl: url + '/images/' + req.file.filename,
    });
    res.status(201).json({
      message: 'Post updated!',
      post,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  const post = await Posts.findAll({
    where: {
      username: req.params.id,
    },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Viewes,
      },
    ],
  });
  res.send(post);
};
