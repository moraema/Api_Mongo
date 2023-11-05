require('dotenv').config()
require('../configs/db.config');

const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const Contacto = require('../models/contacto.model');
const mongoose = require('mongoose');

const contactos = [
  {
    correo: 'miguel@example.com',
    telefono: bcrypt.hashSync('1234567890', saltosBcrypt),
  },
  {
    correo: 'david@example.com',
    telefono: bcrypt.hashSync('0987654321', saltosBcrypt),
  },
  {
    correo: 'juan@example.com',
    telefono: bcrypt.hashSync('4567891230', saltosBcrypt),
  },
];

Contacto.deleteMany({})
  .then(() => {
    return Contacto.insertMany(contactos);
  })
  .then(() => {
    console.log("contactos creados");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
