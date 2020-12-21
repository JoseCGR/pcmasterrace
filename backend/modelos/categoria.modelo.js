const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
        required: [true, 'El nombre de la categoria es necesaria'],
    },
}, {
    timestamps: true
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria; 