// src/models/contacto.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    id_clientes: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;
