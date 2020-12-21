const router = require('express').Router();
const Categoria = require('../modelos/categoria.modelo');

router.route('/').get((req, res) => {
    Categoria.find()
        .then(categorias => res.json(categorias))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const nombre = req.body.nombre;
    const nuevaCategoria = new Categoria({ nombre });

    nuevaCategoria.save()
        .then(() => res.json('Categoria aniadida exitosamente'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;