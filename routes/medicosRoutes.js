const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos.controller'); 
const router = Router();

router.get( '/', getMedicos );

router.post( 
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(), // para validar que es un formato id de mongo.
        validarCampos
    ], 
    crearMedico 
);

router.put( 
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    ], 
    actualizarMedico 
);

router.delete(
    '/:id',
    validarJWT,
    eliminarMedico
);    

module.exports = router;