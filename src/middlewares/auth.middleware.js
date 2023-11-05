const jwt = require('jsonwebtoken');
const jwtSecret = 'clave-secreta';

const verificarJWT = (req, res, next) => {
    const token = req.get('authorization');

    jwt.verify(token, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "error al validar token",
                error: err.message
            });
        }

        req.contacto = decode.contacto;
        next();
    })
};


module.exports = {
    verificarJWT
}