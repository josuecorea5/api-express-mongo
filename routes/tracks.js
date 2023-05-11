const express = require('express');
const router = express.Router();
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');
const { validatorCreateItem, validateGetItem } = require('../validators/tracks');
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

/**
 * @openapi
 * /tracks:
 *  get:
 *    tags:
 *     - Tracks
 *    summary: Get all tracks
 *    description: This endpoint allow to get all tracks
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Tracks listed successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/track'
 *      '404':
 *        description: Tracks not found
 */
router.get('/', authMiddleware, getItems);

/**
 * @openapi
 * /tracks/{id}:
 *  get:
 *    tags:
 *     - Tracks
 *    summary: Get a single track
 *    security:
 *      - bearerAuth: []
 *    description: This endpoint allow to get a track
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Track id
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      '200':
 *        description: Tracks listed successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/track'
 *      '404':
 *        description: Tracks not found
 */
router.get('/:id', authMiddleware, validateGetItem, getItem);

/**
 * @openapi
 * /tracks:
 *  post:
 *    tags:
 *    - Tracks
 *    summary: Create a track
 *    description: This endpoint allow to create a track
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/track'
 *    responses:
 *      '201':
 *        description: Track created successfully
 *      '400':
 *        description: Error creating track
 */
router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem ,createItem);

/**
 * @openapi
 * /tracks/{id}:
 *  put:
 *    tags:
 *    - Tracks
 *    summary: Update a track
 *    description: This endpoint allow to update a track
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Track id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/track'
 *    responses:
 *      '200':
 *        description: Track updated successfully
 *      '500':
 *        description: Error updating track
 */
router.put('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, validatorCreateItem, updateItem);

/**
 * @openapi
 * /tracks/{id}:
 *  delete:
 *    tags:
 *    - Tracks
 *    summary: Delete a track
 *    description: This endpoint allow to delete a track
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Track id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Track deleted successfully
 *      '500':
 *        description: Error deleting track
 */
router.delete('/:id', authMiddleware,  checkRol(['admin']), validateGetItem, deleteItem);

module.exports = router;