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

const actualizarHospital = async (req, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await HospitalModelo.findById( hospitalId );

        if(!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }

        // Actualizar
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await HospitalModelo.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true }) // new: true esto es para que regrese el ultimo documento actualizado.

        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }


}

const eliminarHospital = async (req, res = response) => {

    const hospitalId = req.params.id;

    try {

        const hospital = await HospitalModelo.findById( hospitalId );
        if(!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }

        await HospitalModelo.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            msg: `Hospital con id: ${hospitalId} fue eliminado`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}