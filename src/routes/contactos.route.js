// src/routes/contactos.js
const express = require('express');
const router = express.Router();
const {
  createContacto,
  getContacto,
  getContactos, 
  updateContacto,
  deleteContacto,
  loginContacto,
} = require('../controllers/contactos');
const auth = require('../middlewares/auth');

router.post('/', createContacto);
router.get('/:id', auth, getContacto);
router.get('/', auth, getContactos); 
router.put('/:id', auth, updateContacto);
router.delete('/:id', auth, deleteContacto);
router.post('/login', loginContacto);

module.exports = router;
