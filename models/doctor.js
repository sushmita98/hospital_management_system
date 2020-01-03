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
    appointments: [
        {
            patient: String,
            onDate: Date,
        }
    ],
    out: String
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;
© 2020 GitHub, Inc.
