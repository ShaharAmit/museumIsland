const mongoose = require('mongoose'),
    testing = new mongoose.Schema({
        test2: [String],
        test1: [String]
    }, {collection: 'testing'});

const Testing = mongoose.model('Testing', testing);

module.exports = Testing;

