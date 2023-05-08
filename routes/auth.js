const express = require('express');
const { registerValidation, loginValidation } = require('../validators/auth');
const { register, login } = require('../controllers/auth');
const router = express.Router();

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login);

module.exports = router;