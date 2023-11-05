const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const contactoModel = require('../models/contacto.model');

const loginByEmail = async (req, res) => {
    try {
        const email = req.body;

        const contactoEncontrado = await contactoModel.findOne({ email });

        if (!contactoEncontrado) {
            return res.status(400).json({
                message: "email incorrecto"
            });
        }

        const payload = {
            contacto: {
                id: contactoEncontrado.id
            }
        }

        const token = jwt.sign(payload, 'clave-secreta', { expiresIn: '1h' });

        return res.status(200).json({
            message: "acceso correcto",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al validar credenciales",
            error: error.message
        });
    }
}

module.exports = {
    loginByEmail
}