const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'importantsecret');
    const userId = decodedToken.userId;
    const username = decodedToken.username;
    req.userId = userId;
    req.username = username;
    req.auth = { userId };
    if (req.userId && req.userId !== userId) {
      throw 'User ID is not valid';
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error: 'User not authorized!',
    });
  }
};
