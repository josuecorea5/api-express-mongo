const jwt = require('jsonwebtoken');
const { handleErrorHttp } = require('./handleError');
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = (user) => {
  const tokenInfo = {
    _id: user._id,
    role: user.role,
  };
  const token = jwt.sign(tokenInfo,JWT_SECRET, {expiresIn: '2h'});
  return token;
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    handleErrorHttp(res, 'Error verifying token', 500);
  }
}

module.exports = { tokenSign, verifyToken };