const { response } = require('express');
const bcrypt = require('bcryptjs'); // Todo el resultado del paquete quiero almacenarlo en bcrypt
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUserName = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });

}


const getUsuarios = async (req, res) => {    

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        //msg: 'Get Usuarios'
        usuarios,
        uid: req.uid, // es el uid del usuario que hizo la peticion, viene de validar-jwt, lo agrega en usuariosRoutes 
    });
}

const crearUsuario = async (req, res = response) => {    

    //console.log(req.body);
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email:email });

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save(); // el await significa, espera a que esto termine.

        // Generar JWT 
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            //msg: 'Create Usuarios'
            usuario: usuario, // o solo usuario
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }    
}

const actualizarUsuario = async (req, res = response) => {

    // TODO: validar token y comprobat si es el usuario correcto.

    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        
        // Actualizaciones 
        const {password, google, email, ...campos} = req.body; // Son los campos que envian desde el put de postman

        if( usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        // Lo comentamos porque ya lo estoy extrayendo en { password, google, ...campos }
        // delete campos.password; // Borramos los que no queremos actualizar, si es que exiten en el models
        // delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } ); //  { new: true } con esto le digo que me traiga la data actualizada

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const eliminarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            uid,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    getUserName,
    actualizarUsuario,
    eliminarUsuario
}
    