const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/authControllers');
const { validateFields } = require('../middlewares/fieldValidator');
const validateJWT = require('../middlewares/validateJwt');
const router = Router();


router.post('/new',
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña debe tener 6 caracteres').isLength({ min: 6 }),
      validateFields,
   ],
   createUser
);

router.post('/',
   [
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña debe tener 6 caracteres').isLength({ min: 6 }),
      validateFields
   ],
   loginUser
);

router.get('/renew', validateJWT, renewToken);


module.exports = router;