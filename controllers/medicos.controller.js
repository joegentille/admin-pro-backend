const { response } = require('express');

const MedicoModelo = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await MedicoModelo.find()
                                      .populate('usuario', 'nombre img')
                                      .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new MedicoModelo({ 
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }

    

}

const actualizarMedico = async (req, res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        const medico = await MedicoModelo.findById(medicoId);
        if(!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }

        // Actualizar medico
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await MedicoModelo.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar',
        });
    }

}

const eliminarMedico = async (req, res = response) => {
    
    const medicoId = req.params.id;
    
    try {
        
        const medico = await MedicoModelo.findById(medicoId);
        if(!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }

        await MedicoModelo.findByIdAndDelete(medicoId);
        
        res.json({
            ok: true,
            msg: `Medico con Id: ${medicoId} fue eliminado`
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}