// src/seeders/administrador.js
const Administrador = require('../models/administrador.models');
const bcrypt = require('bcrypt');

const administradores = [
  {
    usuario: 'admin1',
    contraseña: 'admin123',
  },
  {
    usuario: 'admin2',
    contraseña: 'admin456',
  },
  {
    usuario: 'admin3',
    contraseña: 'admin789',
  },
];

const seedAdministradores = async () => {
  try {
    await Administrador.deleteMany();

    for (const administrador of administradores) {
      const hashedPassword = await bcrypt.hash(administrador.contraseña, 10);
      const newAdministrador = new Administrador({
        usuario: administrador.usuario,
        contraseña: hashedPassword,
      });
      await newAdministrador.save();
    }

    console.log('Administradores insertados con éxito');
  } catch (error) {
    console.error('Error al insertar administradores', error.message);
  }
};

module.exports = seedAdministradores;
