// src/seeders/contactos.js
const Contacto = require('../models/contacto');
const Cliente = require('../models/cliente.models');

const contactos = [
  {
    correo: 'contacto1@gmail.com',
    telefono: '1234567890',
    id_clientes: '60a9f1c7f6f8c32c2c9c3b4d',
  },
  {
    correo: 'contacto2@gmail.com',
    telefono: '0987654321',
    id_clientes: '60a9f1c7f6f8c32c2c9c3b4e',
  },
  {
    correo: 'contacto3@gmail.com',
    telefono: '4567891230',
    id_clientes: '60a9f1c7f6f8c32c2c9c3b4f',
  },
];

const seedContactos = async () => {
  try {
    await Contacto.deleteMany();

    for (const contacto of contactos) {
      const newContacto = new Contacto(contacto);
      await newContacto.save();
    }

    console.log('Contactos insertados con éxito');
  } catch (error) {
    console.error('Error al insertar contactos', error.message);
  }
};

module.exports = seedContactos;
