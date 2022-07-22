/* 
    Ruta: /api/usuarios
*/
const { Router } = require('express')
const { check } = require('express-validator'); // podemos ir ala documentacion de npm express validator para ver mas opciones
const { validarCampos } = require('../middleware/validar-campos');
const { getUsuarios, crearUsuario, getUserName, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// Ejemplo basico
// router.get( '/', (req, res) => {
    
//     res.json({
//         ok: true,
//         //msg: 'Hola Joe'
//         // usuarios: [{
//         //     id: 123,
//         //     nomber: 'Joe'
//         // }]
//         usuarios: []
//     })

// });

router.get( '/', validarJWT, getUsuarios );

// router.post( '/', crearUsuario ); original sin middleware

// Con middleware
router.post( 
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos, // despues de los checks llamar al middleware
    ], 
    crearUsuario 
);

router.put( 
    '/:id', 
    [
        validarJWT, // mejor ponerlo aqui para que valide el token primero, luego que haga los checks
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    actualizarUsuario );

router.delete(
    '/:id',
    validarJWT,
    eliminarUsuario
);    

router.get('/getUserName', getUserName);

module.exports = router;