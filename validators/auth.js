const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const registerValidation = [
  check('name')
    .exists()
    .isLength({min: 3, max: 50})
    .notEmpty(),
  check('age')
    .exists()
    .isNumeric(),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({min: 6}),
  (req, res, next) => validateResults(req, res, next)
];

const loginValidation = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { registerValidation, loginValidation };