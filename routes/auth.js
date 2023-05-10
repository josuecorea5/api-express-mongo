const express = require('express');
const { registerValidation, loginValidation } = require('../validators/auth');
const { register, login } = require('../controllers/auth');
const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *     - Auth
 *    summary: Register a new user
 *    description: This endpoint allow to register a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/register'
 *      required: true 
 *    responses:
 *     '201':
 *      description: User created successfully
 *     '500':
 *      description: Error creating user   
 */
router.post('/register', registerValidation, register);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login user
 *    description: This endpoint allow to login user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/login'
 *      required: true
 *    responses:
 *      '200':
 *        description: User logged successfully
 *      '400':
 *        description: Email or password is incorrect
 */
router.post('/login', loginValidation, login);

module.exports = router;