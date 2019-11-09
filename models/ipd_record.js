const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    inDate: Date,
    outDate: Date,
    medicines: [String],
    tests: [String],
    diet: String,
    consultantVisits: [{
        name: String,
        visitDate: String
    }],
    bill: [{
        paid: Boolean,
        item: String,
        cost: Number
    }]
});

module.exports = mongoose.model('ipd_records', recordSchema);