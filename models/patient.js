const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    fName: String,
    lName: String,
    image: String,
    age: Number,
    sex: String,
    address: String,
    contact: Number,
    opd_records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'opd_records'
    }],
    ipd_records: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'ipd_records'
    }],
});

module.exports = mongoose.model('patients',patientSchema);