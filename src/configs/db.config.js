const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGODB)
  .then(() => {
    console.log("conexión exitosa a MongoDB")
  })
  .catch(console.log);