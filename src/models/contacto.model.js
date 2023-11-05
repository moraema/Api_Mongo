const mongoose = require('mongoose');

const contactoSchema = mongoose.Schema(
  {
    correo: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
);

module.exports = mongoose.model('contacto', contactoSchema);
