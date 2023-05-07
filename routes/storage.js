const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const { validateGetItem } = require('../validators/tracks');

router.get('/', getItems);

router.get('/:id', validateGetItem, getItem);

router.post('/',uploadMiddleware.single('myfile'),createItem);

router.delete('/:id', validateGetItem, deleteItem);

module.exports = router;