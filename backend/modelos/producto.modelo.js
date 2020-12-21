const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        minlength: 1,
        required: [true, 'El nombre del producto es necesario'],
    },

    precio: {
        type: Number,
        trim: true,
        minlength: 1,
        required: [true, 'El precio del producto es necesario'],

    },

    categoria: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'
    },
}, {
    timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;