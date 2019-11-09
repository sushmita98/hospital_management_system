const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    visitDate: String,
    consultant: String,
    complaints: String,
    history: String,
    diagnosis: String,
    investigation: String,
    medicines: String,
    advice: String,
    nextVisit: String
});

module.exports = mongoose.model('opd_records', recordSchema);