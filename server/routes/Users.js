const express = require('express');
const router = express.Router();
const genUsername = require('unique-username-generator');

const { Users } = require('../models/');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
          email: user.email,
          id: user.id,
        },
        'secret',
        {
          expiresIn: '1h',
        }
      );

      res.status(200).json({
        token,
      });
    } else {
      res.status(401).json({
        Success: false,
        Message: 'Password incorrect',
      });
    }
  });
});

module.exports = router;
