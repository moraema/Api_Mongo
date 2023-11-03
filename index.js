require('dotenv').config();
const express = require('express');
require('./src/configs/db.configs');
const app = express();

const clienteRouter = require('./src/routes/clientes.route');
const authRouter = require('./src/routes/auth.route');


app.use(express.json());
app.use('/clientes', clienteRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("API escuchando en el puerto 3000");
});