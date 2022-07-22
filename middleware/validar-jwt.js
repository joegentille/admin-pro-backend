const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer token
    const token = req.header('x-token');

    //console.log(token);
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET ); // Si no coincide lo atrapamos en el catch
        //console.log(uid);
        req.uid = uid;

        

        next();

    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT,
}