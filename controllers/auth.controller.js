const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no valido'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password ); // El segundo paramentro es la contraseña que se encuentra en la base de datos.
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        // Generar el TOKEN - JWT 
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true, 
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }   

}

const googleSignIn = async (req, res = response) => {


    try {
        //const googleUser = await googleVerify( req.body.token );
        const {email, name, picture} = await googleVerify( req.body.token );
        
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@', // No se usa para nada en realidad
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            //usuario.password = '@@'
            usuario.google = true;            
        }

        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT 
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            email, name, picture,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}