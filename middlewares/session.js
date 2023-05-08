const { handleErrorHttp } = require("../utils/handleError");
const { userModel } = require('../models')
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      handleErrorHttp(res, 'Unauthorized', 401);
      return;
    }
  
    const token = req.headers.authorization.split(' ').pop();
    const tokenInfo = await verifyToken(token);
    if(!tokenInfo._id) {
      handleErrorHttp(res, 'Unauthorized', 401);
      return;
    }

    const user = await userModel.findById(tokenInfo._id);
    const {password, ...userdata} = user.toObject();
    req.user = userdata;
    next();
  } catch (error) {
    handleErrorHttp(res, 'Error verifying token', 500);
  }
};

module.exports = authMiddleware;