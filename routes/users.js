const express = require('express');
const authMiddleware = require('../middlewares/session');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.send('users');
});

module.exports = router;