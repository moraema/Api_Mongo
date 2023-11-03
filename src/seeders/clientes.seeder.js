require('dotenv').config()
require('../configs/db.configs');

const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);
const Clientes = require('../models/cliente.model');
const mongoose = require('mongoose');

const cliente = [
    { nombre: "emmanuel", apellido: "lucas", usuario: "manuel12", password: bcrypt.hashSync("1234", saltosBcrypt) },
    { nombre: "miguel", apellido: "lopez", usuario: "miguel12", password: bcrypt.hashSync("3457", saltosBcrypt) },
    { nombre: "karla", apellido: "morales", usuario: "karla12", password: bcrypt.hashSync("1024", saltosBcrypt) },
    { nombre: "maria", apellido: "mejia", usuario: "maria12", password: bcrypt.hashSync("1504", saltosBcrypt) },
    { nombre: "jose", apellido: "mejia", usuario: "jose12", password: bcrypt.hashSync("1234", saltosBcrypt) },
    { nombre: "jesus", apellido: "lucas", usuario: "jesus12", password: bcrypt.hashSync("1434", saltosBcrypt) },
];

Clientes.deleteMany({})
    .then(() => {
        return Clientes.insertMany(cliente);
    })
    .then(() => {
        console.log("clientes creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });