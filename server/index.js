const express = require('express');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./models');

const port = process.env.PORT || 3001;

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:*',
      'http://100.79.*.*',
      'https://groupomania.matfreitas.dev/*',
    ],
    credentials: true,
  })
);

db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

//Posts
app.use('/api/posts', require('./routes/post'));
// Comments
app.use('/api/comments', require('./routes/Comments'));
// Auth
app.use('/api/auth', require('./routes/user'));
// Likes
app.use('/api/likes', require('./routes/likes'));
