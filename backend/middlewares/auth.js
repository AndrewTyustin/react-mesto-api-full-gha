const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');

const Unauthorized = require('../utils/response-errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Unauthorized('С токеном что-то не так'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new Unauthorized('С токеном что-то не так'));
  }
  req.user = payload;

  return next();
};
