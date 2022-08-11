const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsControllers');
const isDate = require('../helpers/isDate');
const { validateFields } = require('../middlewares/fieldValidator');
const validateJWT = require('../middlewares/validateJwt');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post('/',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha de inicio es obligatorio').custom(isDate),
      validateFields
   ],
   createEvent
);

router.put('/:id',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha de inicio es obligatorio').custom(isDate),
      validateFields
   ],
   updateEvent
);

router.delete('/:id', deleteEvent);


module.exports = router;