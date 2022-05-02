const genUsername = require('unique-username-generator');

const { User } = require('../models/');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, roleId } = req.body;
  const username = genUsername.generateUsername();
  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(409).json({
      message: 'User already registered, please login',
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      roleId,
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

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      Success: false,
      Message: 'User not found',
    });
  }
  bcrypt.compare(password, user.password).then((result) => {
    if (result) {
      const acessToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '1m',
        }
      );
      const refreshToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '1d',
        }
      );
      // Save refresh token in DB
      user.update({
        refreshToken: refreshToken,
      });

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        acessToken,
        // userId: user.id,
        // username: user.username,
      });
    } else {
      res.status(401).json({
        Success: false,
        Message: 'Email or Password incorrect',
      });
    }
  });
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({
      Success: false,
      Message: 'No token provided',
    });
  }
  const refreshToken = cookies.jwt;
  const user = await User.findOne({
    where: {
      refreshToken,
    },
  });
  if (!user) {
    return res.status(404).json({
      Success: false,
      Message: 'User not found',
    });
  }
  user.update({
    refreshToken: null,
  });
  res.status(200).json({
    Success: true,
    Message: 'Logout successful',
  });
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({
      Success: false,
      Message: 'No token provided',
    });
  }
  const refreshToken = cookies.jwt;
  const user = await User.findOne({
    where: {
      refreshToken,
    },
  });
  if (!user) {
    return res.status(403).json({
      Success: false,
      Message: 'User not found',
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || decoded.userId !== user.id) {
      return res.status(403).json({
        Success: false,
        Message: 'Invalid token',
      });
    }
    const acessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '1m',
      }
    );
    res.status(200).json({
      acessToken,
    });
  });
};
