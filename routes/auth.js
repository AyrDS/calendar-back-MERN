/* 
    Rutas de usuari - auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/authController');
const validateForm = require('../middlewares/validateForm');
const validateJWT = require('../middlewares/validateJWT');
const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es inválido').isEmail(),
        check('password', 'La constraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validateForm
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'La constraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validateForm
    ],
    loginUser
);

router.get(
    '/renew',
    [
        validateJWT
    ],
    renewToken
);

module.exports = router; 