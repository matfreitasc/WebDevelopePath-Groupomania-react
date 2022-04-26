const { Users } = require('../models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.refreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
  console.log(cookies.jwt);
  // find user by token in db

  const refreshToken = cookies.jwt;

  // find user in db by token and check if token is valid
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Token is invalid or expired',
      });
    }
    console.log(decoded);
    // find user by id
    Users.findOne({
      where: {
        id: decoded.userId,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      // check if refresh token is the same as in db
      if (user.refreshToken !== refreshToken) {
        return res.status(403).json({
          message: 'Token is invalid or expired',
        });
      }

      // generate new access token
      const accessToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '15m',
        }
      );

      // generate new refresh token
      const newRefreshToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '1d',
        }
      );

      // update refresh token in db
      user.update({
        refreshToken: newRefreshToken,
      });

      // set new refresh token in cookies
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 1000, // 1 day
      });

      // send new access token
      res.status(200).json({
        accessToken,
        userId: user.id,
        username: user.username,
      });
    });
  });
};
