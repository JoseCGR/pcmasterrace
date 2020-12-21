const router = require('express').Router();
let Usuario = require('../modelos/usuario.modelo');
//const jwt = require ('jsonwebtoken');
const { obtenerId } = require('./verifyToken');

router.route('/').get((req, res) => {
    const idUsuario = obtenerId(req);

    Usuario.findById(idUsuario)
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const contrasenia = req.body.contrasenia;
    const nuevoUsuario = new Usuario({ nombre, email, contrasenia });

    nuevoUsuario.save()
        .then(() => res.json('Usuario aniadido exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

