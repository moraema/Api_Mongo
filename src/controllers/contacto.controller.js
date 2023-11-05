const contactoModel = require('../models/contacto.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

const get = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const contactos = await contactoModel.find({ deleted: false }).skip(skip).limit(limit);

    let response = {
      message: "se obtuvieron los contactos correctamente",
      data: contactos
    }

    if (page && limit) {
      const totalContactos = await contactoModel.countDocuments({ deleted: false });
      const totalPages = Math.ceil(totalContactos / limit);
      const currentPage = parseInt(page);
      response = {
        ...response,
        total: totalContactos,
        totalPages,
        currentPage
      }
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los contactos",
      error: error.message
    });
  }
}

const getById = async (req, res) => {
  try {
    const contactoId = req.params.id;
    const contacto = await contactoModel.findById(contactoId);

    if (!contacto) {
      return res.status(404).json({
        message: "contacto no encontrado"
      });
    }

    return res.status(200).json({
      message: "se obtuvieron los contactos correctamente",
      contacto
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los contactos",
      error: error.message
    });
  }
}

const update = async (req, res) => {
  try {
    const contactoId = req.params.id;
    const contactoAutenticado = req.cliente.id;
    const datosActualizar = {
      ...req.body,
      updated_by: contactoAutenticado,
      updated_at: new Date()
    }
    if (req.body.telefono) {
      const hashTelefono = await bcrypt.hashSync(req.body.telefono, saltosBcrypt);
      datosActualizar.telefono = hashTelefono;
    }

    const contactoActualizado = await contactoModel.findByIdAndUpdate(contactoId, datosActualizar);

    if (!contactoActualizado) {
      return res.status(404).json({
        message: "contacto no encontrado"
      });
    }

    return res.status(200).json({
      message: "contacto actualizado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener contactos",
      error: error.message
    });
  }
}

const create = async (req, res) => {
  try {
    const contactoAutenticado = req.contacto.id;

    let contacto = new contactoModel({
      correo: req.body.correo,
      telefono: bcrypt.hashSync(req.body.telefono, saltosBcrypt),
      createdBy: contactoAutenticado,
    });

    await contacto.save()

    return res.status(201).json({
      message: "contacto creado exitosamente"
    });
  } catch (error) {
    return res.status(500).json({
      message: "fallo al crear contacto!",
      error: error.message
    });
  }
};

const deleteLogico = async (req, res) => {
  try {
    const contactoAutenticado = req.contacto.id;
    const contactoId = req.params.id;

    const contactoEliminado = await Contacto.findByIdAndUpdate(contactoId, {
      deleted: true,
      deletedAt: new Date(),
      deletedBy: contactoAutenticado
    });

    if (!contactoEliminado) {
      res.status(401).json({
        message: 'El contacto no fue encontrado'
      });
      return;
    }

    return res.status(200).json({
      message: "contacto eliminado "
    });

  } catch (error) {
    return res.status(500).send({
      message: "ocurrio un error al eliminar el contacto",
      error: error.message
    })
  }
}

module.exports = {
  get,
  getById,
  create,
  delete: deleteLogico,
  update,
}