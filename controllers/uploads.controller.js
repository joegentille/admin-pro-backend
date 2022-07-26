const { response } = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error en el tipo'
        })
    }

    // Validar que exista un archivo
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }    

    // Procesar la imagen
    const file = req.files.imagen; // imagen es el nombre que le pusimos en postman
    //console.log(file);

    const nombreCortado = file.name.split('.') // wolwerine.1.3.jpg 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if( !extensionesValidas.includes(extensionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es extension permitida'
        })
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${  uuidv4() }.${ extensionArchivo }`;

    // Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar DB
        actualizarImagen( tipo, id, nombreArchivo );

        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );

    // Imange por defecto
    if(fs.existsSync(pathImg)) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }


}

module.exports = {
    fileUpload,
    retornaImagen
}