const genUsername = require('unique-username-generator');

const { Users } = require('../models/');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const username = genUsername.generateUsername();
  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }
  const user = await Users.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(409).json({
      message: 'Email already exists',
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashedPassword,
      username,
    });
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
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
      const acessToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '15m',
        }
      );
      const refeshToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '1d',
        }
      );
      // Save refresh token in DB
      user.update({
        refreshToken: refeshToken,
      });

      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 1000,
      });
      res.status(200).json({
        token,
        userId: user.id,
        username: user.username,
      });
    } else {
      res.status(401).json({
        Success: false,
        Message: 'Email and Password incorrect',
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
