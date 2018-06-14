const mongoose = require('mongoose'),
    museums = new mongoose.Schema({
        museum_name: String,
        galeries: [String],
        articles: [String],
    }, {collection: 'Museums'});

const Museums = mongoose.model('Museums', museums);

module.exports = Museums;
