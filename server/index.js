const express = require('express');
const cors = require('cors');

const port = 3001;
const db = require('./models');

app = express();
app.use(express.json());
app.use(cors());

//Routers
const postsRouter = require('./routes/Posts');
app.use('/api/posts', postsRouter);

const commentsRouter = require('./routes/Comments');
app.use('/api/comments', commentsRouter);

db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
});
