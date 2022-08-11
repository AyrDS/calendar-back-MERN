const Event = require('../models/EventsModel')

const getEvents = async (req, res) => {

   const events = await Event.find().populate('user', 'name');

   res.json({
      ok: true,
      events
   });
}

const createEvent = async (req, res) => {

   const event = new Event(req.body);

   try {
      event.user = req.uid;

      await event.save();

      res.json({
         ok: true,
         event
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
}

const updateEvent = async (req, res) => {

   const eventId = req.params.id;
   const uid = req.uid;

   try {

      const event = await Event.findById(eventId);

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: 'El evento no existe'
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene  permiso para editar'
         });
      }

      const newEvent = {
         ...req.body,
         user: uid,
      }

      const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

      res.json({
         ok: true,
         event: updateEvent
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
}

const deleteEvent = async (req, res) => {

   const eventId = req.params.id;
   const uid = req.uid;

   try {

      const event = await Event.findById(eventId);

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: 'El evento no existe'
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene  permiso para editar'
         });
      }

      await Event.findByIdAndDelete(eventId);

      res.json({
         ok: true,
         msg: 'Evento eliminado'
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }

}

module.exports = {
   getEvents,
   createEvent,
   updateEvent,
   deleteEvent
}
