const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId, 
        ref: 'HospitalModel',
        required: true
    } // #Nota: Se puede poner entre corchetes en caso de ser una lista de hospitales [{ type: ...}]

}, 
{
    collection: 'medicos'
});

MedicoSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('MedicoModel', MedicoSchema);
