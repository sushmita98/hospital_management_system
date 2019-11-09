const mongoose = require('mongoose');

const medSchema = mongoose.Schema({
    name: String,
    cost: Number
});

module.exports = mongoose.model('medicines', medSchema);
