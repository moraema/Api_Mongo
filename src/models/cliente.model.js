const mongoose = require('mongoose');

const clientesSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    updated_by: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null
    },
    deleted_by: {
        type: mongoose.Types.ObjectId,
        required: false
    }
});


module.exports = mongoose.model('clientes', clientesSchema);