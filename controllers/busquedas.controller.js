const { response } = require('express');

const UsuarioModel = require('../models/usuario');
const HospitalModel = require('../models/hospital');
const MedicoModel = require('../models/medico');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda; // #Nota: usamos params cuando viene despues del /, como aqui: http://localhost:3005/api/todo/del norte
    const regex = new RegExp( busqueda, 'i' ); // 'i' esto significa insensible, quiere decir que podemos agregar todas las banderas que queramos.

    // const usuarios = await UsuarioModel.find({ 
    //     nombre: regex            // Estamos buscando en la base de datos, en el campo nombre la expresion de busqueda o regex que creamos arriba.
    // });
    // const hospitales = await HospitalModel.find({ nombre: regex });
    // const medicos = await MedicoModel.find({ nombre: regex });

    // Esto es para ejecutar las 3 tareas de manera simultanea.
    const [ usuarios, medicos, hospitales] = await Promise.all([
        UsuarioModel.find({ nombre: regex }),
        HospitalModel.find({ nombre: regex }),
        MedicoModel.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos,
    })

}


const getDocumentosCollecion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await MedicoModel.find({ nombre: regex })
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await HospitalModel.find({ nombre: regex })
                                      .populate('usuario', 'nombre img');
            break;            
        case 'usuarios':
            data = await UsuarioModel.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    res.json({
        ok: true, 
        resultados: data
    })
        
}

module.exports = {
    getTodo,
    getDocumentosCollecion
}