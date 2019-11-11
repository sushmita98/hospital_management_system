const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    fName: String,
    lName: String,
    image: String,
    age: Number, 
    sex: String, 
    specialization: String,
    qualification: String,
    fees: Number, 
    address: String, 
    contact: Number, 
    in: String,
    out: String
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;
