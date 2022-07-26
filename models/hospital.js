const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, //Esto le va a indicar a mongoose con el esquema del Usuario => model('Usuario', UsuarioSchema);
        ref: 'Usuario'
    }

}, 
{
    collection: 'hospitales' // Para que aparezca la collection como hospitales en mongodb
});

// Esto lo hacemos para no devolver _id, sino uid
HospitalSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('HospitalModel', HospitalSchema);
