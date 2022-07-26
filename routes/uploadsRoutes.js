/**
 *  api/uploads/
 */

const { Router, application } = require('express')
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
 
 
const router = Router();

router.use( expressFileUpload() );

router.put( 
    '/:tipo/:id', 
    validarJWT,
    fileUpload
);


router.get( 
    '/:tipo/:foto', 
    validarJWT,
    retornaImagen,
);
 
module.exports = router;