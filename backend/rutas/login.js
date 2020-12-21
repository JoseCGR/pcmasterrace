const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuario.modelo');

router.route('/').post(function (req, res) {

   let body = req.body;

   Usuario.findOne({ email: body.email }, (erro, usuarioDB) => {
      if (erro) {
         return res.status(500).json({
            ok: false,
            err: erro
         })
      }
      // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!usuarioDB) {
         return res.status(400).json({
            ok: false,
            err: {
               message: "Usuario o contraseña incorrectos"
            }
         })
      }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
         return res.status(400).json({
            ok: false,
            err: {
               message: "Usuario o contraseña incorrectos"
            }
         });
      }
      // Genera el token de autenticación
      const token = jwt.sign({_id: usuarioDB._id}, process.env.TOKEN_SECRET, 
         {expiresIn: process.env.CADUCIDAD_TOKEN})     
      res.header('Authorization', `${token}`).send();
   })

});

module.exports = router;