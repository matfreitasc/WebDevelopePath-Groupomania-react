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
  const url = req.protocol + '://' + req.get('host');
  const body = req.body;
  if (req.file === undefined) {
    const post = await Posts.create({
      ...body,
    });
    console.log(req.file);
    res.status(201).json({
      message: 'Post created!',
      post,
    });
  } else {
    const post = await Posts.create({
      ...body,
      imageUrl: url + '/images/' + req.file.filename,
    });
    console.log(post);
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
