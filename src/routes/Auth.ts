import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, ValidateJoi } from '../middleware/Joi';

// Rutas de autenticacion. Son publicas: no piden token en la cabecera Authorization
// (refresh y logout usan la cookie HttpOnly que se envía automáticamente).
const router = express.Router();

router.post('/register', ValidateJoi(Schemas.auth.register), controller.register);
router.post('/login', ValidateJoi(Schemas.auth.login), controller.login);

// Quitamos ValidateJoi porque el token ya no viene en el body, viene en la cookie
router.post('/refresh', controller.refresh);

// Añadimos la nueva ruta de logout
router.post('/logout', controller.logout);

export = router;

// Documentacion de Swagger de las cuatro rutas.
// security: [] quita el candado: no necesitan el access token.

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra un usuario nuevo
 *     description: El usuario se crea siempre con el rol user. No devuelve token, hay que hacer login despues.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterInput' }
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema: { type: object, properties: { user: { $ref: '#/components/schemas/User' } } }
 *       409: { $ref: '#/components/responses/Conflict' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesion
 *     description: Devuelve el access token y el usuario en el JSON. Además, guarda el refresh token en una cookie HttpOnly.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *     responses:
 *       200: { $ref: '#/components/responses/LoginOk' }
 *       401: { $ref: '#/components/responses/BadCredentials' }
 *       422: { $ref: '#/components/responses/Unprocessable' }
 *
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Pide un access token nuevo
 *     description: Lee el refresh token de la cookie HttpOnly y devuelve un nuevo access token si es válido.
 *     security: []
 *     responses:
 *       200:
 *         description: Access token nuevo
 *         content:
 *           application/json:
 *             example: { token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Cierra la sesión
 *     description: Borra la cookie HttpOnly que contiene el refresh token.
 *     security: []
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente y cookie eliminada
 *         content:
 *           application/json:
 *             example: { message: "Sesión cerrada correctamente" }
 */
