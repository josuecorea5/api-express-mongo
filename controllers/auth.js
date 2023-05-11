const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { handleErrorHttp } = require("../utils/handleError");
const { hashPassword, comparePassword } = require("../utils/handlePassword");
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
    res.status(201).send({ data });
  } catch (error) {
    handleErrorHttp(res, 'Error creating user', 500);
  }
};

const login = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      handleErrorHttp(res, 'User not found', 404);
      return;
    }
    const passwordMatch = await comparePassword(password, findUser.password);
    if (!passwordMatch) {
      handleErrorHttp(res, 'email or password is incorrect', 400);
      return;
    }
    const token = tokenSign(findUser);
    const data = {
      user: findUser,
      token
    }
    res.send({data})
  } catch (error) {
    handleErrorHttp(res, 'Error login user', 500);
  }
};

module.exports = { register, login };