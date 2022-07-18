# Nodejs:
First we have an Empty folder.
to create the package.json
$ npm init -y

To install express js:
$ npm install express --save
$ npm install express@4.17.1 --save

Luego crear un archivo index.js con este contenido: console.log('Hola Mundo');
Luego en la terminal ejecutar: node index.js 

Ahora implementamos nuestro servidor rest
Con express ya podemos implementar un servidor rest.

Podemos instalar de forma global, para que funcione con watch, como lo haciamos con angular ng serve, cada cambio que hacemos, grabamos y luego de forma automatica se reinicia.
$ npm install -g nodemon

Luego en script podemos añadir esta seccion:
"scripts": {
    "start:dev": "nodemon index.js"
  },
  "keywords": [],

Luego ejecutamos:
$ npm run start:dev 

Mongoosejs:
$ npm i mongoose

Instalar este paquete para poder leer archivos con extension env.
$ npm i dotenv


$ npm i cors

Github:
========
git init
git add .
git commit -m "CORS y Express - Primer commit"
git remote add origin https://github.com/joegentille/admin-pro-backend.git
git branch -M main
git push -u origin main

Para instalar los modulos de node:
$ npm install