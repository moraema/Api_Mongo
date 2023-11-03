const clienteModel = require('../models/cliente.model')
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

const create = async(req, res) => {
    try {


        const clienteAutenticado = req.cliente.id;

        let cliente = new clienteModel({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            password: bcrypt.hashSync(req.body.password, saltosBcrypt),
            created_at: new Date(),
            created_by: clienteAutenticado
        });

        await cliente.save();

        return res.status(201).json({
            message: "cliente creado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "fallo al crear al cliente",
            error: error.message
        });
    }
};



const obtener = async(req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const cliente = await clienteModel.find({ deleted: false }).sort({ nombre: 1 }).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron correctamente los clientes",
            Data: cliente
        }
        if (page && limit) {
            const totalClientes = await clienteModel.countDocuments({ deleted: false });
            const totalPages = Math.ceil(totalClientes / limit);
            const currentPage = parseInt(page);
            response = {
                ...response,
                total: totalClientes,
                totalPages,
                currentPage
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error al obtener los clientes",
            error: error.message
        })
    }
}



const getById = async(req, res) => {
    try {
        const clientesId = req.params.id;
        const cliente = await clienteModel.findById(clientesId);

        if (!cliente) {
            return res.status(400).json({
                message: "el cliente no fue encontrado"
            });
        }
        return res.status(200).json({
            message: "se obtuvo al cliente correctamente",
            cliente
        });

    } catch (error) {
        return res.status(500).send({
            message: "ocurrio un error al optener al cliente",
            error: error.message
        });
    }
}




const update = async(req, res) => {
    try {
        const clienteAutenticado = req.cliente.id;
        const clienteId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date(),
            updated_by: clienteAutenticado
        }

        if (req.body.password) {

            const hashedPassword = await bcrypt.hash(req.body.password, saltosBcrypt);
            datosActualizar.password = hashedPassword;
        }

        const clienteActualizado = await clienteModel.findByIdAndUpdate(clienteId, datosActualizar);

        if (!clienteActualizado) {
            return res.status(404).json({
                message: "El cliente no fue encontrado"
            });
        }

        return res.status(200).json({
            message: "El cliente fue actualizado con éxito"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al editar el cliente",
            error: error.message
        });
    }
}



const deleteLogico = async(req, res) => {
    try {


        const clienteAutenticado = req.cliente.id;

        const clienteId = req.params.id;
        const clienteEliminado = await clienteModel.findByIdAndUpdate(clienteId, {
            deleted: true,
            deleted_at: new Date(),
            deleted_by: clienteAutenticado
        });

        if (!clienteEliminado) {
            return res.status(400).json({
                message: "el cliente no fue encontrado"
            })
        }

        return res.status(200).json({
            message: "el cliente fue eliminado"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrio un error al eliminar al cliente",
            error: error.message
        })
    }
}



module.exports = {
    create,
    obtener,
    update,
    getById,
    deleteLogico
}