const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/contacto.controller');
const autMiddleware = require('../middlewares/auth.middleware');

router.use(autMiddleware.verificarJWT);

router.get('/', usuariosController.get);
router.get('/:id', usuariosController.getById);
router.post('/', usuariosController.create);
router.delete('/:id', usuariosController.delete);
router.put('/:id', usuariosController.update);

module.exports = router;
