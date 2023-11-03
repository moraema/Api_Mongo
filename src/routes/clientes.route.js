const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');
const autMiddleware = require('../middlewares/auth.middleware');

router.post('/', autMiddleware.verificarJWT, clientesController.create);
router.get('/', autMiddleware.verificarJWT, clientesController.obtener);
router.get('/:id', autMiddleware.verificarJWT, clientesController.getById);
router.put('/:id', autMiddleware.verificarJWT, clientesController.update);
router.delete('/:id', autMiddleware.verificarJWT, clientesController.deleteLogico);




module.exports = router;