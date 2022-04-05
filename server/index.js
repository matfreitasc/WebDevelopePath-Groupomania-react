const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 3001;
const db = require('./models');

app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Routers
const postsRouter = require('./routes/Posts');
app.use('/api/posts', postsRouter);

// Comments
const commentsRouter = require('./routes/Comments');
app.use('/api/comments', commentsRouter);

// Auth
const userRoutes = require('./routes/Users');
app.use('/api/auth', userRoutes);

db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
});
