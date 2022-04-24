const genUsername = require('unique-username-generator');

const { Users } = require('../models/');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const username = genUsername.generateUsername();
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      email,
      password: hash,
    }).then((user) => {
      res.status(200).json({
        Success: true,
        Message: 'User created successfully',
        User: user,
      });
    });
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      Success: false,
      Message: 'User not found',
    });
  }
  bcrypt.compare(password, user.password).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        'importantsecret',
        {
          expiresIn: '1h',
        }
      );
      res.cookie('token', token);
      res.status(200).json({
        token,
        userId: user.id,
        username: user.username,
      });
    } else {
      res.status(401).json({
        Success: false,
        Message: 'Password incorrect',
      });
    }
  });
};

exports.validate = (req, res, next) => {
  res.status(200).json({
    Success: true,
    Message: 'User is authenticated',
    user: req.username,
    id: req.userId,
  });
};
