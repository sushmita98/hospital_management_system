const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    fName: String,
    lName: String,
    image: String,
    specialization: String,
    qualification: String,
    in: String,
    out: String,
    fees: Number
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;