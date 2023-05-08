const express = require('express');
const router = express.Router();
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');
const { validatorCreateItem, validateGetItem } = require('../validators/tracks');
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

router.get('/', authMiddleware, getItems);

router.get('/:id', authMiddleware, validateGetItem, getItem);

router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem ,createItem);

router.put('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, validatorCreateItem, updateItem);

router.delete('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, deleteItem);

module.exports = router;