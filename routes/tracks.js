const express = require('express');
const router = express.Router();
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');
const { validatorCreateItem, validateGetItem } = require('../validators/tracks');

router.get('/', getItems);

router.get('/:id', validateGetItem, getItem);

router.post('/', validatorCreateItem ,createItem);

router.put('/:id', validateGetItem, validatorCreateItem, updateItem);

router.delete('/:id', validateGetItem, deleteItem);

module.exports = router;