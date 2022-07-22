const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {

    // Con esto estoy devolviendo los errores que vimos en usuariosRoutes.js
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next(); // Para que continue a la siguiente funcion
}

module.exports = {
    validarCampos    
} 