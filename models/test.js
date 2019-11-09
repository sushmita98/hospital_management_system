const mongoose = require('mongoose');

const testSchema = {
    name: String,
    cost: Number
}

module.exports = mongoose.model('tests', testSchema);