const { Likes } = require('../models/');
const { Dislikes } = require('../models/');

exports.like = async (req, res) => {
  const PostId = req.body.PostId;
  const UserId = req.userId;
  const found = await Likes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });
  if (!found) {
    await Likes.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.status(201).json({
      PostId: PostId,
      UserId: UserId,
      message: 'liked',
    });
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
    res.json({
      PostId: PostId,
      UserId: UserId,
      message: 'like removed',
    });
  }
};
exports.dislike = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.userId;
  const found = await Dislikes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });
  if (!found) {
    await Dislikes.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.status(201).json({
      PostId: PostId,
      UserId: UserId,
      message: 'disliked',
    });
  } else {
    await Dislikes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
    res.json({
      PostId: PostId,
      UserId: UserId,
      message: 'dislike removed',
    });
  }
};

exports.getLikes = async (req, res) => {
  const { PostId } = req.body;
  const likes = await Likes.findAll({
    where: {
      PostId: PostId,
    },
  });
  res.status(200).json({
    likes,
  });
};
exports.getDislikes = async (req, res) => {
  const { PostId } = req.body;
  const dislikes = await Dislikes.findAll({
    where: {
      PostId: PostId,
    },
  });
  res.status(200).json({
    dislikes,
  });
};
