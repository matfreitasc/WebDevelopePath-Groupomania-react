const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./models');

const port = process.env.PORT || 3001;

require('dotenv').config();
app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
});

app.use(express.json());

//Posts
app.use('/api/posts', require('./routes/post'));
// Comments
app.use('/api/comments', require('./routes/Comments'));
// Auth
app.use('/api/auth', require('./routes/user'));
// Likes
app.use('/api/likes', require('./routes/likes'));
