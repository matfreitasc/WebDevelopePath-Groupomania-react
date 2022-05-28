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
    const accessToken = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '15m',
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: '1d',
      }
    );
    // Save refresh token in DB
    newUser.update({
      refreshToken: refreshToken,
    });

    res.status(201).json({
      accessToken,
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
      const accessToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '15m',
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
        accessToken,
        userId: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        bio: user.bio,
        profilePicture: user.profile_image,
        profileBanner: user.profile_banner,
        darkMode: user.darkMode,
        role: user.roleId,
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
  const refreshToken = cookies.jwt;
  if (!refreshToken) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(204).json({
      Success: false,
      Message: 'Cookie Cleared',
    });
  }
  const user = await User.findOne({
    where: {
      refreshToken,
    },
  });
  user.update({
    refreshToken: null,
  });
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(204).json({
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
    console.log('User not found');
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
    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '1d',
      }
    );
    res.status(200).json({
      accessToken,
      userId: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profile_image,
      profileBanner: user.profile_banner,
      darkMode: user.darkMode,
      role: user.roleId,
    });
  });
};

exports.getUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      Success: false,
      Message: 'User not found',
    });
  }
  res.status(200).json({
    userId: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    bio: user.bio,
    profilePicture: user.profile_image,
    profileBanner: user.profile_banner,
    darkMode: user.darkMode,
  });
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, password, roleId, name, bio, darkMode, username } = req.body;
  console.log(req.body);
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      Message: 'User not found',
    });
  }
  if (email) {
    user.update({
      email,
    });
  }
  if (password) {
    user.update({
      password: await bcrypt.hash(password, 10),
    });
  }
  if (roleId) {
    user.update({
      roleId,
    });
  }
  if (name) {
    user.update({
      name,
    });
  }
  if (bio) {
    user.update({
      bio,
    });
  }
  if (darkMode) {
    user.update({
      darkMode,
    });
  }
  if (username) {
    user.update({
      username,
    });
  }
  res.status(200).json({
    user: {
      userId: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profile_image,
      profileBanner: user.profile_banner,
      darkMode: user.darkMode,
      role: user.roleId,
    },
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });
  if (!user) {
    return res.status(404).json({
      Success: false,
      Message: 'User not found',
    });
  }
  user.destroy();
  res.status(200).json({
    Success: true,
    Message: 'User deleted',
  });
};
