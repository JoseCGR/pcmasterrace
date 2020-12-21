const router = require('express').Router();
const Producto = require('../modelos/producto.modelo');
const Usuario = require('../modelos/usuario.modelo');

router.route('/').get((req, res) => {
    Producto.find()
        .then(productos => res.json(productos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;

    const nuevoProducto = new Producto({ nombre, precio, categoria });
    nuevoProducto.save()
        .then(doc => res.json(doc))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/eliminar').delete((req, res) => {
    const producto = req.body.producto;
    try {
        Producto.findByIdAndDelete(producto)
            .then(() => res.json('Producto eliminado correctamente'))
            .catch(() => res.json('No se pudo eliminar el producto'));

    } catch (err) {
        console.log('Error' + err);
    }
});

router.route('/modificar').put((req, res) => {
    const producto = req.body.data.producto;
    const nombre = req.body.data.nombre;
    const precio = req.body.data.precio;
    const categoria = req.body.data.categoria;
    try {
        Producto.findByIdAndUpdate(producto, {
            nombre: nombre, precio: precio, categoria: categoria
        }, { useFindAndModify: false, new: true }, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    } catch (err) {
        console.log('Error' + err);
    }
});

module.exports = router;