const Likes = require('../models/Likes');

exports.like = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.userId;
  const found = await Likes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });
  console.log(found);
  if (!found) {
    await Likes.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.json({
      message: 'Liked!',
    });
  } else {
    console.log(found);
    await Likes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
  }
};
