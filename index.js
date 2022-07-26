require('dotenv').config(); // #Nota: Luego de instalar el paquete dotenv y crear el archivo .env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors()); // Luego de instalar el paquete cors

// Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body 
app.use(express.json());

// Base de datos
dbConnection();

console.log(process.env); // #Nota: con esto veo todas las variables de entorno de node.

// Rutas
app.use('/api/usuario', require('./routes/usuariosRoutes'));
app.use('/api/login', require('./routes/authRoutes'));
app.use('/api/hospitales', require('./routes/hospitalesRoutes'));
app.use('/api/medicos', require('./routes/medicosRoutes'));
app.use('/api/todo', require('./routes/busquedasRoutes'));
app.use('/api/uploads', require('./routes/uploadsRoutes'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});