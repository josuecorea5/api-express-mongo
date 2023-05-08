const express = require('express');
const { registerValidation } = require('../validators/auth');
const { register } = require('../controllers/auth');
const router = express.Router();

router.post('/', registerValidation, register)


module.exports = router;