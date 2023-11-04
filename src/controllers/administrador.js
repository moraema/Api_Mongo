// src/controllers/administrador.js
const Administrador = require('../models/administrador.models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../configs/jwt');

const createAdministrador = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const administrador = await Administrador.findOne({ usuario });

    if (administrador) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe',
      });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newAdministrador = new Administrador({
      usuario,
      contraseña: hashedPassword,
    });

    await newAdministrador.save();

    res.status(201).json({
      success: true,
      message: 'Administrador creado con éxito',
      data: newAdministrador,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear administrador',
      error: error.message,
    });
  }
};

const getAdministrador = async (req, res) => {
  try {
    const { id } = req.params;

    const administrador = await Administrador.findById(id);

    if (!administrador) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el administrador',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Administrador encontrado',
      data: administrador,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener administrador',
      error: error.message,
    });
  }
};

const getAdministradores = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const skip = (page - 1) * limit;

    const administradores = await Administrador.find({ deletedAt: null })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Administrador.countDocuments({ deletedAt: null });

    res.status(200).json({
      success: true,
      message: 'Administradores encontrados',
      data: administradores,
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
      message: 'Error al obtener administradores',
      error: error.message,
    });
  }
};

const updateAdministrador = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, contraseña } = req.body;

    const administrador = await Administrador.findById(id);

    if (!administrador) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el administrador',
      });
    }

    if (usuario) {
      administrador.usuario = usuario;
    }

    if (contraseña) {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      administrador.contraseña = hashedPassword;
    }

    administrador.updatedAt = Date.now();

    await administrador.save();

    res.status(200).json({
      success: true,
      message: 'Administrador actualizado con éxito',
      data: administrador,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar administrador',
      error: error.message,
    });
  }
};

const deleteAdministrador = async (req, res) => {
  try {
    const { id } = req.params;

    const administrador = await Administrador.findById(id);

    if (!administrador) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el administrador',
      });
    }

    administrador.deletedAt = Date.now();

    await administrador.save();

    res.status(200).json({
      success: true,
      message: 'Administrador eliminado con éxito',
      data: administrador,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar administrador',
      error: error.message,
    });
  }
};

const loginAdministrador = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const administrador = await Administrador.findOne({ usuario });

    if (!administrador) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    const match = await bcrypt.compare(contraseña, administrador.contraseña);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    const token = generateToken({ id: administrador.id });

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: administrador,
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
  createAdministrador,
  getAdministrador,
  getAdministradores,
  updateAdministrador,
  deleteAdministrador,
  loginAdministrador,
};
