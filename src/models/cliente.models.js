const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema(
    {
        id_clientes: {
            type: Number,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        usuario: {
            type: String,
            required: true,
        },
        contraseña: {
            type: String,
            required: true,
        },
        ubicacion: {
            type: String,
            required: true,
        },
    }
);

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;