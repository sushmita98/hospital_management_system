const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    complaints: String,
    history: String,
    diagnosis: String,
    investigation: String,
    medicines: String,
    advice: String,
    nextVisit: Date
});

module.exports = mongoose.model('records', recordSchema);