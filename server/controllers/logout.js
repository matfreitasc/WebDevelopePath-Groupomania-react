const { Users } = require('../models');
const jwt = require('jsonwebtoken');

exports.logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204).json({
      message: 'No token provided',
    });
  }
  // find user by token in db
  const refreshToken = cookies.jwt;
  // find user in db by token and check if token is valid
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      res.clearCookie('jwt', {
        httpOnly: true,
      });
      return res.sendStatus(204);
    }
    // Delete the refresh token from the database
    Users.findOne({
      where: {
        id: decoded.userId,
      },
    }).then((user) => {
      // check if refresh token is the same as in db
      if (user.refreshToken === refreshToken) {
        // delete refresh token from db
        user.update({
          refreshToken: null,
        });
        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'None',
          secured: true,
        });
        return res.sendStatus(204);
      }
    });
  });
};
