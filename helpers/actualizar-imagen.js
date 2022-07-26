const fs = require('fs');

const UsuarioModel = require('../models/usuario');
const HospitalModel = require('../models/hospital');
const MedicoModel = require('../models/medico');

const borrarImagen = (path) => {
    if( fs.existsSync(path) ) {
        fs.unlinkSync( path ) // esto es para borrar la imagen
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    //console.log('Vamos bien!');
    switch (tipo) {
        case 'medicos':
        {
            const medico = await MedicoModel.findById(id);
            if( !medico ) {
                console.log('No es un medico por id');
                return false;
            }
            
            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        }

        case 'hospitales':
        {            
            const hospital = await HospitalModel.findById(id);
            if( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }
            
            const pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        }

        case 'usuarios':
        {
            const usuario = await UsuarioModel.findById(id);
            if( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }
            
            const pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        }
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}