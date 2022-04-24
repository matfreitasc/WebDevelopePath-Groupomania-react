const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return res.status(401).json({
      message: 'Token is invalid or expired',
    });
  }
  jwt.verify(token, process.env.ACESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Token is invalid or expired',
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
