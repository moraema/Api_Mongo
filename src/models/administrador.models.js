// src/models/administrador.js
const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
      unique: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;
