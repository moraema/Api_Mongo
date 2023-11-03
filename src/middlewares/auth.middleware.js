const jwt = require('jsonwebtoken');
const jwtSecret = 'palabra-secreta';

const verificarJWT = (req, res, next) => {
    const token = req.get('authorization');

    jwt.verify(token, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "error al validar el token",
                error: err.message
            });
        }
        req.cliente = decode.cliente;
        next();
    });
};


module.exports = {
    verificarJWT
}