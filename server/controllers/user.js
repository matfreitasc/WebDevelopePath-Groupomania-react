const { User, Posts } = require('../models/');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const { email, password, name, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }
  if (!name || !username || !req.file) {
    return res.status(400).json({
      message: 'Please provide name, username and profile picture',
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
      name,
      password: hashedPassword,
      username,
      profile_image: url + '/images/' + req.file.filename,
      profile_banner:
        'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
    });
    const accessToken = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '5m',
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
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

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      accessToken,
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
      profilePicture: newUser.profile_image,
      profileBanner: newUser.profile_banner,
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
      success: false,
      message: 'User not found',
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
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email or Password incorrect',
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
    });
  });
};

exports.getUser = async (req, res) => {
  const username = req.params.id;

  const user = await User.findOne({
    where: {
      username,
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
  });
};
exports.updateUser = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const id = req.params.id;
  const { email, password, name, username, bio } = req.body;
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
  const posts = await Posts.findAll({
    where: {
      userId: id,
    },
  });
  if (email) {
    user.update({
      email: email,
    });
  }
  if (password) {
    user.update({
      password: await bcrypt.hash(password, 10),
    });
  }
  if (name) {
    user.update({
      name,
    });
  }
  if (username) {
    user.update({
      username,
    });
    posts.forEach(async (post) => {
      post.update({
        username,
      });
    });
  }
  if (req.file !== undefined) {
    user.update({
      profile_image: url + '/images/' + req.file.filename,
    });
  }
  if (bio) {
    user.update({
      bio,
    });
  }

  res.status(200).json({
    resStatus: true,
    message: 'Profile updated successfully',
    userId: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    bio: user.bio,
    profilePicture: user.profile_image,
    profile_banner: user.profile_banner,
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });
  const posts = await Posts.findAll({
    where: {
      userId: req.userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      Success: false,
      Message: 'User not found',
    });
  }
  user.destroy();

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    Success: true,
    Message: 'User deleted',
  });
};
