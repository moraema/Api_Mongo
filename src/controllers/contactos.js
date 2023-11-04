// src/controllers/contactos.js
const Contacto = require('../models/contacto.models');
const Cliente = require('../models/cliente.models');
const { generateToken } = require('../configs/jwt');

const createContacto = async (req, res) => {
  try {
    const { correo, telefono, id_clientes } = req.body;

    const cliente = await Cliente.findById(id_clientes);

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el cliente',
      });
    }

    const contacto = await Contacto.findOne({ correo });

    if (contacto) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya existe',
      });
    }

    const newContacto = new Contacto({
      correo,
      telefono,
      id_clientes,
    });

    await newContacto.save();

    res.status(201).json({
      success: true,
      message: 'Contacto creado con éxito',
      data: newContacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear contacto',
      error: error.message,
    });
  }
};

const getContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const contacto = await Contacto.findById(id).populate('id_clientes');

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el contacto',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contacto encontrado',
      data: contacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener contacto',
      error: error.message,
    });
  }
};

const getContactos = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const skip = (page - 1) * limit;

    const contactos = await Contacto.find({ deletedAt: null })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('id_clientes');

    const total = await Contacto.countDocuments({ deletedAt: null });

    res.status(200).json({
      success: true,
      message: 'Contactos encontrados',
      data: contactos,
      meta: {
        page,
        limit,
        sort,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message,
    });
  }
};

const updateContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const { correo, telefono, id_clientes } = req.body;

    const contacto = await Contacto.findById(id);

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el contacto',
      });
    }

    if (correo) {
      const contactoExistente = await Contacto.findOne({ correo });

      if (contactoExistente && contactoExistente.id !== id) {
        return res.status(400).json({
          success: false,
          message: 'El correo ya existe',
        });
      }

      contacto.correo = correo;
    }

    if (telefono) {
      contacto.telefono = telefono;
    }

    if (id_clientes) {
      const cliente = await Cliente.findById(id_clientes);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'No se encontró el cliente',
        });
      }

      contacto.id_clientes = id_clientes;
    }

    contacto.updatedAt = new Date();

    await contacto.save();

    res.status(200).json({
      success: true,
      message: 'Contacto actualizado con éxito',
      data: contacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar contacto',
      error: error.message,
    });
  }
};

const deleteContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const contacto = await Contacto.findById(id);

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el contacto',
      });
    }

    contacto.deletedAt = new Date();

    await contacto.save();

    res.status(200).json({
      success: true,
      message: 'Contacto eliminado con éxito',
      data: contacto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar contacto',
      error: error.message,
    });
  }
};

const loginContacto = async (req, res) => {
  try {
    const { correo, telefono } = req.body;

    const contacto = await Contacto.findOne({ correo, deletedAt: null });

    if (!contacto) {
      return res.status(401).json({
        success: false,
        message: 'Correo o teléfono incorrectos',
      });
    }

    if (contacto.telefono !== telefono) {
      return res.status(401).json({
        success: false,
        message: 'Correo o teléfono incorrectos',
      });
    }

    const token = generateToken({ id: contacto.id });

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: contacto,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
};

module.exports = {
  createContacto,
  getContacto,
  getContactos,
  updateContacto,
  deleteContacto,
  loginContacto,
};
