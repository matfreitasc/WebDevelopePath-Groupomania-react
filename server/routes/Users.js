const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).send({
        error: 'Error creating user',
      });
    } else {
      try {
        const user = await Users.create({
          name,
          email,
          password: hash,
        });
        res.status(201).send(user);
      } catch (e) {
        res.status(400).send({
          error: 'Error creating user',
        });
      }
    }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(401).send({
        error: 'Invalid email or password',
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).send({
          error: 'Invalid email or password',
        });
      } else {
        req.session.user = user.id;
        res.status(200).send(user);

        console.log(req.session.user, 'req.session.user');
        console.log('user logged in');
      }
    }
  } catch (e) {
    res.status(500).send({
      error: 'Error logging in',
    });
  }
});

router.get('/loggedin', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
