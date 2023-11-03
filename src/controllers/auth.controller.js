const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/cliente.model');

const login = async(req, res) => {
    try {
        const { usuario, password } = req.body;

        const clienteEncontrado = await usuarioModel.findOne({ usuario });
        if (!clienteEncontrado) {
            return res.status(400).json({
                message: "usuario o password incorrecto"
            });
        }

        const passwordCorrecto = bcrypt.compareSync(password, clienteEncontrado.password);
        if (!passwordCorrecto) {
            return res.status(400).json({
                message: "usuario o password incorrectos"
            });
        }

        const payload = {
            cliente: {
                id: clienteEncontrado._id
            }
        }


        const token = jwt.sign(payload, 'palabra-secreta', { expiresIn: '1h' });

        return res.status(200).json({
            message: "el acceso fue correcto",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio en error al validar las credenciales",
            error: error.message
        });
    }
}


module.exports = {
    login
}