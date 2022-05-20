const { Viewes } = require('../models/');

exports.viewes = async (req, res) => {
  const { PostId } = req.body;
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
  }
};
