const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { handleErrorHttp } = require("../utils/handleError");
const { hashPassword } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");

const register = async (req, res) => {
  try {
    req = matchedData(req);
    const { name, age, email, password } = req;
    const hash = await hashPassword(password);
    const user = await userModel.create({ name, age, email, password: hash });
    const token = tokenSign(user);
    const data = {
      user,
      token
    }
    res.send({ data });
  } catch (error) {
    handleErrorHttp(res, 'Error creating user', 500);
  }
};

module.exports = { register };