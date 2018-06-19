const mongoose = require('mongoose'),
    museums = new mongoose.Schema({
        museum_name: String,
        galleries: [String],
        articles: [String],
        "items_for_sale": [{
            name: String,
            genre: String,
            price: String,
            description: String
        }]
    }, {
        collection: 'Museums'
    });

const Museums = mongoose.model('Museums', museums);

module.exports = Museums;