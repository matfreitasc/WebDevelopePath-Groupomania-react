const { Viewes } = require('../models/');

exports.viewes = async (req, res) => {
  const PostId = req.params.id;
  const UserId = req.userId;
  const found = await Viewes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });

  if (!found) {
    await Viewes.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.json({
      message: 'Viewed',
    });
  } else {
    res.json({
      message: 'Already Viewed',
    });
  }
};
exports.getViewes = async (req, res) => {
  const post = await Viewes.findAll({
    where: {
      PostId: req.params.id,
    },
  });
  res.send(post);
};
