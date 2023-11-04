// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());


mongoose.connect(process.env.MONGO_URL);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

const administradorRouter = require('./src/routes/contactos.route');

app.use('/api/contactos', administradorRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});