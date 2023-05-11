const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const { validateGetItem } = require('../validators/tracks');
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

/**
 * @openapi
 * /storage:
 *  get:
 *    tags:
 *     - Storage
 *    summary: Get all files
 *    description: This endpoint allow to get all files
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: files listed successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/storage'
 *      '500':
 *        description: Error getting files
 */
router.get('/', authMiddleware, getItems);

/**
 * @openapi
 * /storage/{id}:
 *  get:
 *    tags:
 *     - Storage
 *    summary: Get a single file
 *    security:
 *      - bearerAuth: []
 *    description: This endpoint allow to get a file
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Storage id
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: file listed successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/storage'
 *      '500':
 *        description: file not found
 */
router.get('/:id', authMiddleware, validateGetItem, getItem);

/**
 * @openapi
 * /storage:
 *  post:
 *    tags:
 *    - Storage
 *    summary: Create a file
 *    description: This endpoint allow to create a file
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - myfile  
 *            properties:
 *              myfile:
 *                type: string
 *                format: binary
 *    responses:
 *      '201':
 *        description: File created successfully
 *      '401':
 *        description: Error creating file
 */
router.post('/', authMiddleware,  checkRol(['admin']), uploadMiddleware.single('myfile'),createItem);

/**
 * @openapi
 * /storage/{id}:
 *  delete:
 *    tags:
 *    - Storage
 *    summary: Delete a file
 *    description: This endpoint allow to delete a file
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: File id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: File deleted successfully
 *      '500':
 *        description: Error deleting file
 */
router.delete('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, deleteItem);

module.exports = router;