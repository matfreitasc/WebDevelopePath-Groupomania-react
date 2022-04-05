const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accessToken = req.header('accessToken').split(' ')[1];
  console.log(accessToken);

  if (!accessToken) return res.json({ error: 'User not logged in!' });

  try {
    const validToken = verify(accessToken, 'importantsecret');

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
