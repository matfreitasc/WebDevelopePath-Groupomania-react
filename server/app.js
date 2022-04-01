const express = require('express');
const db = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.db = db.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});

module.exports = app;
