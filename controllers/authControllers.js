const bcrypt = require('bcryptjs');
const User = require('../models/UsersModel');
const createJWT = require('../helpers/jwt');

const createUser = async (req, res) => {

   const { email, password } = req.body;

   try {

      let user = await User.findOne({ email });

      if (user) {
         return res.status(400).json({
            ok: false,
            msg: 'El email ingresado ya esta en uso'
         });
      }

      user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      //jwt
      const token = await createJWT(user.id, user.name);

      res.status(201).json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
}


const loginUser = async (req, res) => {

   const { email, password } = req.body;

   try {

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos'
         });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
         return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos'
         });
      }

      //jwt
      const token = await createJWT(user.id, user.name);

      res.status(201).json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
}

const renewToken = async (req, res) => {

   const uid = req.uid;
   const name = req.name;

   const token = await createJWT(uid, name);


   res.json({
      ok: true,
      token,
      uid,
      name
   })
}


module.exports = {
   createUser,
   loginUser,
   renewToken,
}