const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const { validateGetItem } = require('../validators/tracks');
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

router.get('/', authMiddleware, getItems);

router.get('/:id', authMiddleware, validateGetItem, getItem);

router.post('/', authMiddleware,  checkRol(['admin']), uploadMiddleware.single('myfile'),createItem);

router.delete('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, deleteItem);

module.exports = router;