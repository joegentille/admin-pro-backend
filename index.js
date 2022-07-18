require('dotenv').config(); // #Nota: Luego de instalar el paquete dotenv y crear el archivo .env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors()); // Luego de instalar el paquete cors

// Base de datos
dbConnection();

console.log(process.env); // #Nota: con esto veo todas las variables de entorno de node.

app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Joe'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});