/* 
    Rutas events
    host + /api/events
*/

const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const isDate = require('../helper/isDate');
const validateForm = require('../middlewares/validateForm');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

//Validar todas las rutas con jwt

router.use(validateJWT);

router.get(
    '/',
    getEvents
);

router.post(
    '/',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateForm
    ],
    createEvent
);

router.put(
    '/:id',

    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateForm
    ],
    updateEvent
);

router.delete(
    '/:id',
    deleteEvent
);

module.exports = router;