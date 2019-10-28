const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    fName: String,
    lName: String,
    image: String,
    age: Number,
    sex: String,
    address: String,
    contact: Number,
    records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'records'
    }]
});

module.exports = mongoose.model('patients',patientSchema);