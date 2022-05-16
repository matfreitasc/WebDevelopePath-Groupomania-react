const Likes = require('../models/Likes');

exports.like = async (req, res) => {
  console.log('Request ', req);
  const { PostId } = req.body;
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
    res.json({
      message: 'Liked!',
    });
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
  }
};
