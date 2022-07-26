const { response } = require('express');

const HospitalModelo = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await  HospitalModelo.find()
                                            .populate('usuario', 'nombre email img');

    res.json({
        ok: true,
        hospitales
    })

}

const crearHospital = async (req, res = response) => {
    
    const uid = req.uid;
    const hospital = new HospitalModelo({ 
        usuario: uid,
        ...req.body
    });

    // console.log(uid);

    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }


}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })

}

const eliminarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'eliminarHospital'
    })

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}